/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

/**
 * @fileOverview Matcher class implementing matching addresses against a list of filters.
 */

var EXPORTED_SYMBOLS = ["Matcher", "CombinedMatcher", "defaultMatcher"];

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;
const Cu = Components.utils;

let baseURL = "resource://adblocker/modules/";
Cu.import(baseURL + "FilterClasses.jsm");

/**
 * Blacklist/whitelist filter matching
 * @constructor
 */
function Matcher()
{
  this.clear();
}

Matcher.prototype = {
  /**
   * Lookup table for filters by their associated keyword
   * @type Object
   */
  filterByKeyword: null,

  /**
   * Lookup table for keywords by the filter text
   * @type Object
   */
  keywordByFilter: null,

  /**
   * Removes all known filters
   */
  clear: function()
  {
    this.filterByKeyword = {__proto__: null};
    this.keywordByFilter = {__proto__: null};
  },

  /**
   * Adds a filter to the matcher
   * @param {RegExpFilter} filter
   */
  add: function(filter)
  {
    if (filter.text in this.keywordByFilter)
      return;

    // Look for a suitable keyword
    let keyword = this.findKeyword(filter);
    let oldEntry = this.filterByKeyword[keyword];
    if (typeof oldEntry == "undefined")
      this.filterByKeyword[keyword] = filter;
    else if (oldEntry.length == 1)
      this.filterByKeyword[keyword] = [oldEntry, filter];
    else
      oldEntry.push(filter);
    this.keywordByFilter[filter.text] = keyword;
  },

  /**
   * Removes a filter from the matcher
   * @param {RegExpFilter} filter
   */
  remove: function(filter)
  {
    if (!(filter.text in this.keywordByFilter))
      return;

    let keyword = this.keywordByFilter[filter.text];
    let list = this.filterByKeyword[keyword];
    if (list.length <= 1)
      delete this.filterByKeyword[keyword];
    else
    {
      let index = list.indexOf(filter);
      if (index >= 0)
      {
        list.splice(index, 1);
        if (list.length == 1)
          this.filterByKeyword[keyword] = list[0];
      }
    }

    delete this.keywordByFilter[filter.text];
  },

  /**
   * Chooses a keyword to be associated with the filter
   * @param {String} text text representation of the filter
   * @return {String} keyword (might be empty string)
   */
  findKeyword: function(filter)
  {
    // For donottrack filters use "donottrack" as keyword if nothing else matches
    let defaultResult = (filter.contentType & RegExpFilter.typeMap.DONOTTRACK ? "donottrack" : "");

    let text = filter.text;
    if (Filter.regexpRegExp.test(text))
      return defaultResult;

    // Remove options
    let match = Filter.optionsRegExp.exec(text);
    if (match)
      text = match.input.substr(0, match.index);

    // Remove whitelist marker
    if (text.substr(0, 2) == "@@")
      text = text.substr(2);

    let candidates = text.toLowerCase().match(/[^a-z0-9%*][a-z0-9%]{3,}(?=[^a-z0-9%*])/g);
    if (!candidates)
      return defaultResult;

    let hash = this.filterByKeyword;
    let result = defaultResult;
    let resultCount = 0xFFFFFF;
    let resultLength = 0;
    for (let i = 0, l = candidates.length; i < l; i++)
    {
      let candidate = candidates[i].substr(1);
      let count = (candidate in hash ? hash[candidate].length : 0);
      if (count < resultCount || (count == resultCount && candidate.length > resultLength))
      {
        result = candidate;
        resultCount = count;
        resultLength = candidate.length;
      }
    }
    return result;
  },

  /**
   * Checks whether a particular filter is being matched against.
   */
  hasFilter: function(/**RegExpFilter*/ filter) /**Boolean*/
  {
    return (filter.text in this.keywordByFilter);
  },

  /**
   * Returns the keyword used for a filter, null for unknown filters.
   */
  getKeywordForFilter: function(/**RegExpFilter*/ filter) /**String*/
  {
    if (filter.text in this.keywordByFilter)
      return this.keywordByFilter[filter.text];
    else
      return null;
  },

  /**
   * Checks whether the entries for a particular keyword match a URL
   */
  _checkEntryMatch: function(keyword, location, contentType, docDomain, thirdParty)
  {
    let list = this.filterByKeyword[keyword];
    for (let i = 0; i < list.length; i++)
    {
      let filter = list[i];
      if (filter.matches(location, contentType, docDomain, thirdParty))
        return filter;
    }
    return null;
  },

  /**
   * Tests whether the URL matches any of the known filters
   * @param {String} location URL to be tested
   * @param {String} contentType content type identifier of the URL
   * @param {String} docDomain domain name of the document that loads the URL
   * @param {Boolean} thirdParty should be true if the URL is a third-party request
   * @return {RegExpFilter} matching filter or null
   */
  matchesAny: function(location, contentType, docDomain, thirdParty)
  {
    let candidates = location.toLowerCase().match(/[a-z0-9%]{3,}/g);
    if (candidates === null)
      candidates = [];
    if (contentType == "DONOTTRACK")
      candidates.unshift("donottrack");
    else
      candidates.push("");
    for (let i = 0, l = candidates.length; i < l; i++)
    {
      let substr = candidates[i];
      if (substr in this.filterByKeyword)
      {
        let result = this._checkEntryMatch(substr, location, contentType, docDomain, thirdParty);
        if (result)
          return result;
      }
    }

    return null;
  }
};

/**
 * Combines a matcher for blocking and exception rules, automatically sorts
 * rules into two Matcher instances.
 * @constructor
 */
function CombinedMatcher()
{
  this.blacklist = new Matcher();
  this.whitelist = new Matcher();
  this.resultCache = {__proto__: null};
}

/**
 * Maximal number of matching cache entries to be kept
 * @type Number
 */
CombinedMatcher.maxCacheEntries = 1000;

CombinedMatcher.prototype =
{
  /**
   * Matcher for blocking rules.
   * @type Matcher
   */
  blacklist: null,

  /**
   * Matcher for exception rules.
   * @type Matcher
   */
  whitelist: null,

  /**
   * Lookup table of previous matchesAny results
   * @type Object
   */
  resultCache: null,

  /**
   * Number of entries in resultCache
   * @type Number
   */
  cacheEntries: 0,

  /**
   * @see Matcher#clear
   */
  clear: function()
  {
    this.blacklist.clear();
    this.whitelist.clear();
    this.resultCache = {__proto__: null};
    this.cacheEntries = 0;
  },

  /**
   * @see Matcher#add
   */
  add: function(filter)
  {
    if (filter instanceof WhitelistFilter)
    {
        this.whitelist.add(filter);
    }
    else
      this.blacklist.add(filter);

    if (this.cacheEntries > 0)
    {
      this.resultCache = {__proto__: null};
      this.cacheEntries = 0;
    }
  },

  /**
   * @see Matcher#remove
   */
  remove: function(filter)
  {
    if (filter instanceof WhitelistFilter)
    {
        this.whitelist.remove(filter);
    }
    else
      this.blacklist.remove(filter);

    if (this.cacheEntries > 0)
    {
      this.resultCache = {__proto__: null};
      this.cacheEntries = 0;
    }
  },

  /**
   * @see Matcher#findKeyword
   */
  findKeyword: function(filter)
  {
    if (filter instanceof WhitelistFilter)
      return this.whitelist.findKeyword(filter);
    else
      return this.blacklist.findKeyword(filter);
  },

  /**
   * @see Matcher#hasFilter
   */
  hasFilter: function(filter)
  {
    if (filter instanceof WhitelistFilter)
      return this.whitelist.hasFilter(filter);
    else
      return this.blacklist.hasFilter(filter);
  },

  /**
   * @see Matcher#getKeywordForFilter
   */
  getKeywordForFilter: function(filter)
  {
    if (filter instanceof WhitelistFilter)
      return this.whitelist.getKeywordForFilter(filter);
    else
      return this.blacklist.getKeywordForFilter(filter);
  },

  /**
   * Checks whether a particular filter is slow
   */
  isSlowFilter: function(/**RegExpFilter*/ filter) /**Boolean*/
  {
    let matcher = (filter instanceof WhitelistFilter ? this.whitelist : this.blacklist);
    if (matcher.hasFilter(filter))
      return !matcher.getKeywordForFilter(filter);
    else
      return !matcher.findKeyword(filter);
  },

  /**
   * Optimized filter matching testing both whitelist and blacklist matchers
   * simultaneously. For parameters see Matcher.matchesAny().
   * @see Matcher#matchesAny
   */
  matchesAnyInternal: function(location, contentType, docDomain, thirdParty)
  {
    let candidates = location.toLowerCase().match(/[a-z0-9%]{3,}/g);
    if (candidates === null)
      candidates = [];
    if (contentType == "DONOTTRACK")
      candidates.unshift("donottrack");
    else
      candidates.push("");

    let blacklistHit = null;
    for (let i = 0, l = candidates.length; i < l; i++)
    {
      let substr = candidates[i];
      if (substr in this.whitelist.filterByKeyword)
      {
        let result = this.whitelist._checkEntryMatch(substr, location, contentType, docDomain, thirdParty);
        if (result)
          return result;
      }
      if (substr in this.blacklist.filterByKeyword && blacklistHit === null)
        blacklistHit = this.blacklist._checkEntryMatch(substr, location, contentType, docDomain, thirdParty);
    }
    return blacklistHit;
  },

  /**
   * @see Matcher#matchesAny
   */
  matchesAny: function(location, contentType, docDomain, thirdParty)
  {
    let key = location + " " + contentType + " " + docDomain + " " + thirdParty;
    if (key in this.resultCache)
      return this.resultCache[key];

    let result = this.matchesAnyInternal(location, contentType, docDomain, thirdParty);

    if (this.cacheEntries >= CombinedMatcher.maxCacheEntries)
    {
      this.resultCache = {__proto__: null};
      this.cacheEntries = 0;
    }

    this.resultCache[key] = result;
    this.cacheEntries++;

    return result;
  },
}

/**
 * Shared CombinedMatcher instance that should usually be used.
 * @type CombinedMatcher
 */
var defaultMatcher = new CombinedMatcher();
