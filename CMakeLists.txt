# CMake Basics
cmake_minimum_required (VERSION 2.8.11)
project (adblocklatitude)

# Preprocessor Metadata
set(ADDON_ID "adblocklatitude@addons.palemoon.org")
set(ADDON_VERSION "3.5.0a2")
set(ADDON_NAME "Adblock Latitude")
set(ADDON_XPI_NAME "adblocklatitude")
set(ADDON_SHORT_DESC "Acceptable ads were yesterday!")
set(ADDON_LONG_DESC "Adblock Latitude is a direct fork of Adblock Plus made specifically for the Pale Moon browser.<br /><br />Adblock Latitude is designed to be a drop in replacement for ABP and will utilize all your exsisting settings. However, ABL is more than that. It intends to also replace Adblock Edge by removing the hard coded Acceptable Ads feature.<br /><br />Adblock Latitude can be installed over the previously available Pseudo-Static version of Adblock Plus but you will have to uninstall the Pseudo-Static of Adblock Edge as these will conflict as will the orginal versions of ABP and ABE. Likewise, if you were an ABE user you will have to setup ABL to your previous settings.")
set(ADDON_AUTHOR "Pale Moon Add-ons Team")
set(ADDON_TARGET_APP_NAME "Pale Moon")
set(ADDON_TARGET_APP_ID "{8de7fcbb-c55c-4fbe-bfc5-fc555c87dbc4}")
set(ADDON_TARGET_APP_MINVER "25.0")
set(ADDON_TARGET_APP_MAXVER "25.*")
set(ADDON_APMO_ID "pm-102")
set(ADDON_APMO_TYPE "extension")

# Process Pale Moon Add-ons Site manifest.ini
configure_file(
	${CMAKE_SOURCE_DIR}/manifest.ini.in 
	${CMAKE_BINARY_DIR}/dist/package/manifest.ini 
	@only
)

# Process Pale Moon Add-ons Site update.xml
configure_file(
	${CMAKE_SOURCE_DIR}/update.xml.in 
	${CMAKE_BINARY_DIR}/dist/package/update.xml 
	@only
)

# Copy Add-on files to dist/bin
file(
	COPY "${CMAKE_SOURCE_DIR}/src/"
	DESTINATION "${CMAKE_BINARY_DIR}/dist/bin/"
)

# Process Add-on chrome.manifest file
configure_file(
	${CMAKE_SOURCE_DIR}/chrome.manifest.in 
	${CMAKE_BINARY_DIR}/dist/bin/chrome.manifest 
	@only
)

# Process Add-on install.rdf file
configure_file(
	${CMAKE_SOURCE_DIR}/install.rdf.in 
	${CMAKE_BINARY_DIR}/dist/bin/install.rdf 
	@only
)

# Zip up the dist/bin contents into an XPI file and hash it to the console
add_custom_command (
	WORKING_DIRECTORY ${CMAKE_BINARY_DIR}/dist/bin/
	OUTPUT ${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi
	COMMAND zip -r ../package/${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi ./
	COMMAND whash -sha256 ${CMAKE_BINARY_DIR}"/dist/package/"${ADDON_XPI_NAME}"-"${ADDON_VERSION}".xpi"
	DEPENDS package-xpi
)

add_custom_target(
	package-xpi
	ALL
	DEPENDS ${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi
)