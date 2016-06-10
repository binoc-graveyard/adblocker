build_macro_mkPaths()
FIND_FINAL_TARGET()

set(CSS_FILES
    ${mk_srcdir}/about.css
    ${mk_srcdir}/composer.css
    ${mk_srcdir}/filters.css
    ${mk_srcdir}/firstRun.css
    ${mk_srcdir}/overlay.css
    ${mk_srcdir}/sendReport.css
    ${mk_srcdir}/sidebar.css
    ${mk_srcdir}/subscriptionSelection.css
)

set(PNG_FILES
    ${mk_srcdir}/abp-icon-big.png
    ${mk_srcdir}/abp-status.png
    ${mk_srcdir}/abp.status-16.png
    ${mk_srcdir}/checkbox.png
    ${mk_srcdir}/close.png
    ${mk_srcdir}/item-state.png
    ${mk_srcdir}/slow.png
)

set(SOURCE_FILES
    ${JS_FILES}
    ${XML_FILES}
    ${XUL_FILES}
)

COPY_TO_DIST("${SOURCE_FILES}")