build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SOURCE_FILES
    ${mk_srcdir}/icon.png
    ${mk_srcdir}/icon64.png
)

COPY_TO_DIST("${SOURCE_FILES}")

# Preprocess files
build_func_preprocess(
    manifest.ini.in
    ${FINAL_TARGET}/../package/manifest.ini
    ${ppDefines}
)

build_func_preprocess(
    chrome.manifest.in
    ${FINAL_TARGET}chrome.manifest
    ${ppDefines}
)

build_func_preprocess(
    install.rdf.in
    ${FINAL_TARGET}install.rdf
    ${ppDefines}
)

add_subdirectory(components)
add_subdirectory(content)
add_subdirectory(defaults)
add_subdirectory(locale/en-US)
add_subdirectory(modules)
add_subdirectory(skin)