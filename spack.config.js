const { config } = require("@swc/core/spack");

// import path module
const path = require("path");

module.exports = config({
    entry: {
        isoToLanguage: path.join("src", "index.ts"),
    },
    options: {
        sourceMaps: true,
        module: {
            type: "umd",
            noInterop: false,
            globals: {
                default: "color-2-name"
            },
            strict: false,
            strictMode: true,
            lazy: false
        },
        minify: true,
        jsc: {
            target: "es5",
            loose: false,
            minify: {
                compress: {
                    arguments: false,
                    arrows: true,
                    booleans: true,
                    booleans_as_integers: false,
                    collapse_vars: true,
                    comparisons: true,
                    computed_props: true,
                    conditionals: true,
                    dead_code: true,
                    directives: true,
                    drop_console: false,
                    drop_debugger: true,
                    evaluate: true,
                    expression: false,
                    hoist_funs: false,
                    hoist_props: true,
                    hoist_vars: false,
                    if_return: true,
                    join_vars: true,
                    keep_classnames: false,
                    keep_fargs: true,
                    keep_fnames: false,
                    keep_infinity: false,
                    loops: true,
                    negate_iife: true,
                    properties: true,
                    reduce_funcs: false,
                    reduce_vars: false,
                    side_effects: true,
                    switches: true,
                    typeofs: true,
                    unsafe: false,
                    unsafe_arrows: false,
                    unsafe_comps: false,
                    unsafe_Function: false,
                    unsafe_math: false,
                    unsafe_symbols: false,
                    unsafe_methods: false,
                    unsafe_proto: false,
                    unsafe_regexp: false,
                    unsafe_undefined: false,
                    unused: true,
                    const_to_let: true,
                    pristine_globals: true
                },
                mangle: {
                    toplevel: false,
                    keep_classnames: false,
                    keep_fnames: false,
                    keep_private_props: false,
                    ie8: false,
                    safari10: false
                }
            }
        },
    },
    output: {
        path: path.join('lib', 'umd'),
    },
});
