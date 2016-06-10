build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SOURCE_FILES
    ${mk_srcdir}/adblockplus.js
)


COPY_TO_DIST(${SOURCE_FILES})