build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SOURCE_FILES
    ${mk_srcdir}/icon.png
    ${mk_srcdir}/icon64.png
)

COPY_TO_DIST("${SOURCE_FILES}")

add_subdirectory(components)
add_subdirectory(content)
add_subdirectory(defaults)
add_subdirectory(locale)
add_subdirectory(modules)
add_subdirectory(skin)