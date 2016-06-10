build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SOURCE_FILES
    ${mk_srcdir}/objtabs.css
    ${mk_srcdir}/fennecContent.js
    ${mk_srcdir}/errors.html
)

COPY_TO_DIST("${SOURCE_FILES}")

add_subdirectory(ui)