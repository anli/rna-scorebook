module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@navigation': './src/navigation',
          '@components': './src/components',
          '@store': './src/store',
          '@mocks': './__mocks__',
          '@theme': './src/theme',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
