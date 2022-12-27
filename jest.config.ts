import type { Config } from 'jest'
import { defaults } from 'jest-config'

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
  globals: {
    "ts-jest": {
      "useESM": true
    }
  }
}

export default config
