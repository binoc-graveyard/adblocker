build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SRC_CSS_FILES
    ${mk_srcdir}/objtabs.css
)

set(SRC_HTML_FILES
    ${mk_srcdir}/errors.html
)

set(SRC_JS_FILES
    ${mk_srcdir}/composer.js
    ${mk_srcdir}/filters-backup.js
    ${mk_srcdir}/filters-filteractions.js
    ${mk_srcdir}/filters-filterview.js
    ${mk_srcdir}/filters-search.js
    ${mk_srcdir}/filters-subscriptionactions.js
    ${mk_srcdir}/filters-subscriptionview.js
    ${mk_srcdir}/filters.js
    ${mk_srcdir}/firstRun.js
    ${mk_srcdir}/flasher.js
    ${mk_srcdir}/sendReport.js
    ${mk_srcdir}/subscriptionSelection.js
)

set(SRC_XML_FILES
    ${mk_srcdir}/progressBar.xml
    ${mk_srcdir}/subscriptions.xml
)

set(SOURCE_FILES
    ${SRC_CSS_FILES}
    ${SRC_HTML_FILES}
    ${SRC_JS_FILES}
    ${SRC_XML_FILES}
)

COPY_TO_DIST("${SOURCE_FILES}")

set(SOURCE_PP_FILES
    about.js.in
    about.xul.in
    composer.xul.in
    filters.xul.in
    phoenixOverlay.xul.in
    navigatorOverlay.xul.in
    firstRun.xul.in
    overlay.js.in
    overlayGeneral.xul.in
    sendReport.xul.in
    settings.xul.in
    sidebar.js.in
    sidebar.xul.in
    sidebarDetached.xul.in
    subscriptionSelection.xul.in
    utils.js.in
)

COMMON_PREPROCESS("${SOURCE_PP_FILES}")

