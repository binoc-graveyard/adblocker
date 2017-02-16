build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SOURCE_PP_FILES
    about.dtd.in
    composer.dtd.in
    filters.dtd.in
    firstRun.dtd.in
    global.properties.in
    overlay.dtd.in
    sendReport.dtd.in
    sidebar.dtd.in
    subscriptionSelection.dtd.in
)

COMMON_PREPROCESS("${SOURCE_PP_FILES}")

