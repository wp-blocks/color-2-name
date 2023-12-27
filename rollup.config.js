/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

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
      name: 'color2name',
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
      name: 'color2name',
      file: 'lib/umd/color-2-name.min.js'
    }
  }),
  config({
    output: {
      format: 'cjs',
      name: 'color2name',
      file: 'lib/cjs/color-2-name.cjs'
    }
  }),
  config({
    output: {
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      dir: 'lib/esm/'
    }
  })
];
