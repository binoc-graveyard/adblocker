build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SRC_CSS_FILES
    ${mk_srcdir}/objtabs.css
)

set(SRC_HTML_FILES
    ${mk_srcdir}/errors.html
)

set(SRC_JS_FILES
    ${mk_srcdir}/fennecContent.js
)

set(SOURCE_FILES
    ${SRC_CSS_FILES}
    ${SRC_HTML_FILES}
    ${SRC_JS_FILES}
)

COPY_TO_DIST("${SOURCE_FILES}")

add_subdirectory(ui)
