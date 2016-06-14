# Preprocessor Metadata
set(ADDON_ID "adblocklatitude@addons.palemoon.org")
set(ADDON_VERSION "3.5.0b3")
set(ADDON_NAME "Adblock Latitude")
set(ADDON_XPI_NAME "adblocklatitude")
set(ADDON_SHORT_DESC "Acceptable ads were yesterday!")
set(ADDON_LONG_DESC "This is the Next Generation Adblock Latitude. <br /><br /> Please disable or remove any previous versions of the Adblock Family before installing. You may want to make a backup of your filter presets via the Filter Preferences window so that you can reimport them if something goes wrong.")
set(ADDON_AUTHOR "Pale Moon Add-ons Team")
set(ADDON_TARGET_APP_NAME "Pale Moon")
set(ADDON_TARGET_APP_ID "{8de7fcbb-c55c-4fbe-bfc5-fc555c87dbc4}")
set(ADDON_TARGET_APP_MINVER "25.0")
set(ADDON_TARGET_APP_MAXVER "27.*")
set(ADDON_APMO_ID "pm-102")
set(ADDON_APMO_TYPE "extension")

set(ppDefines
    -DADDON_ID="${ADDON_ID}"
    -DADDON_VERSION="${ADDON_VERSION}"
    -DADDON_NAME="${ADDON_NAME}"
    -DADDON_XPI_NAME="${ADDON_XPI_NAME}"
    -DADDON_CHROME_NAME="${ADDON_XPI_NAME}"
    -DADDON_SHORT_DESC="${ADDON_SHORT_DESC}"
    -DADDON_LONG_DESC="${ADDON_LONG_DESC}"
    -DADDON_AUTHOR="${ADDON_AUTHOR}"
    -DADDON_TARGET_APP_NAME="${ADDON_TARGET_APP_NAME}"
    -DADDON_TARGET_APP_ID="${ADDON_TARGET_APP_ID}"
    -DADDON_TARGET_APP_MINVER="${ADDON_TARGET_APP_MINVER}"
    -DADDON_TARGET_APP_MAXVER="${ADDON_TARGET_APP_MAXVER}"
    -DADDON_APMO_ID="${ADDON_APMO_ID}"
    -DADDON_APMO_TYPE="${ADDON_APMO_TYPE}"
)