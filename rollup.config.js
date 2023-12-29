import node from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import terser from "@rollup/plugin-terser";

function config({plugins = [], output = {}}) {
  return {
    input: 'src/index.ts',
    plugins: [
      typescript({tsconfigOverride: {compilerOptions: {module: 'ES2015'}}}),
      node(), ...plugins
    ],
    output: {
      ...output,
    },
    external: []
  };
}

export default [
  config({
    output: {
      format: 'umd',
      name: 'color-2-name',
      file: 'lib/umd/color-2-name.js'
    }
  }),
  config({
    plugins: [
      terser({
        mangle: true,
        compress: true,
        output: {
          beautify: false,
          comments: false,
          inline_script: true,
        },
      }),
    ],
    output: {
      format: 'umd',
      name: 'color-2-name',
      file: 'lib/umd/color-2-name.min.js'
    }
  }),
  config({
    output: {
      name: 'color-2-name',
      format: 'cjs',
      dir: 'lib/cjs/',
      preserveModules: true,
      sourcemap: true
    }
  }),
  config({
    output: {
      format: 'esm',
      preserveModules: true,
      sourcemap: true,
      dir: 'lib/esm/'
    }
  })
];
