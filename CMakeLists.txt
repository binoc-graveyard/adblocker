# CMake Basics
cmake_minimum_required (VERSION 3.5)
project (adblocklatitude NONE)

include(${CMAKE_CURRENT_SOURCE_DIR}/config/metadata.cmake)

# Process Pale Moon Add-ons Site manifest.ini
configure_file(
	${CMAKE_CURRENT_SOURCE_DIR}/manifest.ini.in 
	${CMAKE_BINARY_DIR}/dist/package/manifest.ini 
	@only
)

# Process Add-on chrome.manifest file
configure_file(
	${CMAKE_CURRENT_SOURCE_DIR}/chrome.manifest.in 
	${CMAKE_BINARY_DIR}/dist/bin/chrome.manifest 
	@only
)

# Process Add-on install.rdf file
configure_file(
	${CMAKE_CURRENT_SOURCE_DIR}/install.rdf.in 
	${CMAKE_BINARY_DIR}/dist/bin/install.rdf 
	@only
)

# Copy Add-on files to dist/bin
file(
	COPY "${CMAKE_CURRENT_SOURCE_DIR}/src/"
	DESTINATION "${CMAKE_BINARY_DIR}/dist/bin/"
)

# Zip up the dist/bin contents into an XPI file
add_custom_command (
	WORKING_DIRECTORY ${CMAKE_BINARY_DIR}/dist/bin/
	OUTPUT ${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi
	COMMAND zip -r9XD ../package/${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi ./
	DEPENDS package-xpi
)

add_custom_target(
	package-xpi
	ALL
	DEPENDS ${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi
)
