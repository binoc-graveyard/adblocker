build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SOURCE_FILES
    ${mk_srcdir}/Initializer.js
)

COPY_TO_DIST(${SOURCE_FILES})
