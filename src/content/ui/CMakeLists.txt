build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SRC_JS_FILES
    ${mk_srcdir}/about.js
    ${mk_srcdir}/composer.js
    ${mk_srcdir}/filters-backup.js
    ${mk_srcdir}/filters-filteractions.js
    ${mk_srcdir}/filters-filterview.js
    ${mk_srcdir}/filters-search.js
    ${mk_srcdir}/filters-subscriptionactions.js
    ${mk_srcdir}/filters-subscriptionview.js
    ${mk_srcdir}/filters.js
    ${mk_srcdir}/firstRun.js
    ${mk_srcdir}/flasher.js
    ${mk_srcdir}/overlay.js
    ${mk_srcdir}/sendReport.js
    ${mk_srcdir}/sidebar.js
    ${mk_srcdir}/subscriptionSelection.js
    ${mk_srcdir}/utils.js
)

set(SRC_XML_FILES
    ${mk_srcdir}/progressBar.xml
    ${mk_srcdir}/subscriptions.xml
)

set(SRC_XUL_FILES
    ${mk_srcdir}/about.xul
    ${mk_srcdir}/composer.xul
    ${mk_srcdir}/fennecNativeOverlay.xul
    ${mk_srcdir}/fennecOverlay.xul
    ${mk_srcdir}/fennecSettings.xul
    ${mk_srcdir}/fennecSubscription.xul
    ${mk_srcdir}/filters.xul
    ${mk_srcdir}/firefoxOverlay.xul
    ${mk_srcdir}/firstRun.xul
    ${mk_srcdir}/mailOverlay.xul
    ${mk_srcdir}/overlayGeneral.xul
    ${mk_srcdir}/seamonkeyOverlay.xul
    ${mk_srcdir}/sendReport.xul
    ${mk_srcdir}/settings.xul
    ${mk_srcdir}/sidebar.xul
    ${mk_srcdir}/sidebarDetached.xul
    ${mk_srcdir}/subscriptionSelection.xul
    ${mk_srcdir}/thunderbirdOverlay.xul
)

set(SOURCE_FILES
    ${SRC_JS_FILES}
    ${SRC_XML_FILES}
    ${SRC_XUL_FILES}
)

COPY_TO_DIST("${SOURCE_FILES}")

