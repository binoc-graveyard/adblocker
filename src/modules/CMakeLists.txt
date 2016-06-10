build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SOURCE_FILES
    ${mk_srcdir}/AppIntegration.jsm
    ${mk_srcdir}/AppIntegrationFennec.jsm
    ${mk_srcdir}/AppIntegrationFennecNative.jsm
    ${mk_srcdir}/Bootstrap.jsm
    ${mk_srcdir}/ContentPolicy.jsm
    ${mk_srcdir}/ContentPolicyRemote.jsm
    ${mk_srcdir}/ElemHide.jsm
    ${mk_srcdir}/ElemHideRemote.jsm
    ${mk_srcdir}/FilterClasses.jsm
    ${mk_srcdir}/FilterListener.jsm
    ${mk_srcdir}/FilterNotifier.jsm
    ${mk_srcdir}/FilterStorage.jsm
    ${mk_srcdir}/IO.jsm
    ${mk_srcdir}/Matcher.jsm
    ${mk_srcdir}/ObjectTabs.jsm
    ${mk_srcdir}/Prefs.jsm
    ${mk_srcdir}/Public.jsm
    ${mk_srcdir}/RequestNotifier.jsm
    ${mk_srcdir}/SubscriptionClasses.jsm
    ${mk_srcdir}/Sync.jsm
    ${mk_srcdir}/Synchronizer.jsm
    ${mk_srcdir}/TimeLine.jsm
    ${mk_srcdir}/Utils.jsm
)

COPY_TO_DIST("${SOURCE_FILES}")

