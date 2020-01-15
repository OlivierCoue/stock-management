/* eslint-disable import/no-commonjs */

module.exports = {
  rootDir: 'tests',
  testMatch: ['**/*.spec.?(j|t)s?(x)'],
  transform: {
    '^.+\\.(gql|graphql)$': 'jest-transform-graphql',
    '^.+\\.tsx?$': 'ts-jest',
    '.*': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'ts', 'tsx'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.html$': '<rootDir>/mock/file-mock.js',
    '\\.css$': '<rootDir>/mock/file-mock.js',
    '\\.(bmp|gif|ico|jpe?g|png|webp)$': '<rootDir>/mock/file-mock.js',
    '\\.svg$': '<rootDir>/mock/file-mock.js',
    '\\.(avi|flv|mkv|mov|mp4|webm|wmv)$': '<rootDir>/mock/file-mock.js',
    '\\.(eot|otf|ttf|woff2?)$': '<rootDir>/mock/file-mock.js',
    '\\.(aac|aiff|flac|m4a|mp3|ogg|wav|wma)$': '<rootDir>/mock/file-mock.js',
  },
}
