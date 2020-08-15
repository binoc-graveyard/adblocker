MOZ_APP_NAME=adblocker
MOZ_APP_VERSION=`$PYTHON ${_topsrcdir}/build/version2k.py --version ${_topsrcdir}/adblocker/config/version.txt`

BINOC_ADDON_NAME=ABPrime
BINOC_ADDON_ID=abprime@projects.binaryoutcast.com
BINOC_ADDON_CREATOR="Binary Outcast"
BINOC_ADDON_DESCRIPTION="Bootstrapped adblocking is yesterday!"
BINOC_ADDON_VERSION=$MOZ_APP_VERSION
BINOC_ADDON_CHROME_NAME=$MOZ_APP_NAME
BINOC_ADDON_XPI_NAME=adblocker