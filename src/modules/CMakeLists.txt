build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SOURCE_PP_FILES
    AppIntegration.jsm.in
    AppIntegrationFennec.jsm.in
    AppIntegrationFennecNative.jsm.in
    Bootstrap.jsm.in
    ContentPolicy.jsm.in
    ContentPolicyRemote.jsm.in
    ElemHide.jsm.in
    ElemHideRemote.jsm.in
    FilterClasses.jsm.in
    FilterListener.jsm.in
    FilterNotifier.jsm.in
    FilterStorage.jsm.in
    IO.jsm.in
    Matcher.jsm.in
    ObjectTabs.jsm.in
    Prefs.jsm.in
    Public.jsm.in
    RequestNotifier.jsm.in
    SubscriptionClasses.jsm.in
    Sync.jsm.in
    Synchronizer.jsm.in
    TimeLine.jsm.in
    Utils.jsm.in
)

COMMON_PREPROCESS("${SOURCE_PP_FILES}")

