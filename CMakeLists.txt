if((BINOC_BUILD) AND (NOT CMAKE_BINARY_DIR MATCHES CMAKE_SOURCE_DIR))
    build_macro_mkPaths()

    include(${mk_srcdir}/config/metadata.cmake)

    # Figure out FINAL_TARGET in a ridiculous way
    macro(FIND_FINAL_TARGET)
        string(REPLACE "${mk_topsrcdir}/projects/${BUILD_PROJECT}/" "" _PATH_DIFF ${mk_srcdir})
        if(${_PATH_DIFF} MATCHES "src/(.*)")
            string(REPLACE "src/" "" _PATH_DIFF ${_PATH_DIFF})
        elseif(${_PATH_DIFF} MATCHES "src")
            string(REPLACE "src" "" _PATH_DIFF ${_PATH_DIFF})
        endif()
        
        set(FINAL_TARGET ${_PATH_DIFF})
    endmacro(FIND_FINAL_TARGET)

    function(COPY_TO_DIST _FILE_LIST)
        file(COPY ${_FILE_LIST} DESTINATION "${CMAKE_INSTALL_PREFIX}/${FINAL_TARGET}/")
    endfunction(COPY_TO_DIST)

    FIND_FINAL_TARGET()

    # Add subdirectories
    add_subdirectory(src)

    # Preprocess files
    build_func_preprocess(
        manifest.ini.in
        ../package/manifest.ini
        ${ppDefines}
    )

    build_func_preprocess(
        chrome.manifest.in
        chrome.manifest
        ${ppDefines}
    )

    build_func_preprocess(
        install.rdf.in
        install.rdf
        ${ppDefines}
    )

    build_func_package(${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi)
else()
    cmake_minimum_required (VERSION 2.8.11)
    project (adblock-latitude NONE)

    message(
        FATAL_ERROR
        "\n"
        "*** This project can only be built with the Binary Outcast Build System.\n"
        "*** Please clone https://github.com/binoc-network/build-system.git and then move or re-clone this project into the [build-system]/projects/[this-project] directory.\n"
        "*** Be sure to clean up any build artifacts here before trying to restart your build by executing the axion build script.")
endif()
