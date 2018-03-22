build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SRC_CSS_FILES
    ${mk_srcdir}/objtabs.css
)

set(SRC_HTML_FILES
    ${mk_srcdir}/errors.html
)

set(SOURCE_FILES
    ${SRC_CSS_FILES}
    ${SRC_HTML_FILES}
)

COPY_TO_DIST("${SOURCE_FILES}")

add_subdirectory(ui)
