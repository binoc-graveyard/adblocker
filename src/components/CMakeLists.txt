build_macro_mkPaths()
FIND_FINAL_TARGET()

set(SOURCE_PP_FILES
    Initializer.js.in
)

COMMON_PREPROCESS("${SOURCE_PP_FILES}")

