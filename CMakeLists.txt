build_macro_mkPaths()
message("This is a BinOC Build")
include(${mk_srcdir}/config/metadata.cmake)

macro(FIND_FINAL_TARGET)
    string(REPLACE "${mk_topsrcdir}/projects/${BUILD_PROJECT}/" "" _PATH_DIFF ${mk_srcdir})
    if(${_PATH_DIFF} MATCHES "src/(.*)")
        string(REPLACE "src/" "" _PATH_DIFF ${_PATH_DIFF})
    elseif(${_PATH_DIFF} MATCHES "src")
        string(REPLACE "src" "" _PATH_DIFF ${_PATH_DIFF})
    endif()
endmacro(FIND_FINAL_TARGET)

function(COPY_TO_DIST _FILE_LIST)
    file(COPY ${_FILE_LIST} DESTINATION "${mk_topobjdir}/dist/bin/${_PATH_DIFF}/")
endfunction(COPY_TO_DIST)

# Add subdirectories
add_subdirectory(src)

# Process Pale Moon Add-ons Site manifest.ini
configure_file(
    ${CMAKE_CURRENT_SOURCE_DIR}/manifest.ini.in 
    ${CMAKE_BINARY_DIR}/dist/package/manifest.ini 
)

# Process Add-on chrome.manifest file
configure_file(
    ${CMAKE_CURRENT_SOURCE_DIR}/chrome.manifest.in 
    ${CMAKE_BINARY_DIR}/dist/bin/chrome.manifest 
)

# Process Add-on install.rdf file
configure_file(
    ${CMAKE_CURRENT_SOURCE_DIR}/install.rdf.in 
    ${CMAKE_BINARY_DIR}/dist/bin/install.rdf 
)

build_func_package(${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi)
