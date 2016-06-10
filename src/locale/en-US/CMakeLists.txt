build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SOURCE_FILES
    ${mk_srcdir}/global.properties
    ${mk_srcdir}/about.dtd
    ${mk_srcdir}/composer.dtd
    ${mk_srcdir}/filters.dtd
    ${mk_srcdir}/firstRun.dtd
    ${mk_srcdir}/overlay.dtd
    ${mk_srcdir}/sendReport.dtd
    ${mk_srcdir}/sidebar.dtd
    ${mk_srcdir}/subscriptionSelection.dtd
)

COPY_TO_DIST("${SOURCE_FILES}")