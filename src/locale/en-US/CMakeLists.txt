build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SRC_DTD_FILES
    ${mk_srcdir}/about.dtd
    ${mk_srcdir}/composer.dtd
    ${mk_srcdir}/filters.dtd
    ${mk_srcdir}/firstRun.dtd
    ${mk_srcdir}/overlay.dtd
    ${mk_srcdir}/sendReport.dtd
    ${mk_srcdir}/sidebar.dtd
    ${mk_srcdir}/subscriptionSelection.dtd
)

set(SRC_PROPERTIES_FILES
    ${mk_srcdir}/global.properties
)

set(SOURCE_FILES
    ${SRC_DTD_FILES}
    ${SRC_PROPERTIES_FILES}
)

COPY_TO_DIST("${SOURCE_FILES}")

