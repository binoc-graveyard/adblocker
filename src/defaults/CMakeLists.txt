build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SRC_MISC_FILES
    ${mk_srcdir}/patterns.ini
)

set(SOURCE_FILES
    ${SRC_MISC_FILES}
)

COPY_TO_DIST("${SOURCE_FILES}")

add_subdirectory(preferences)
