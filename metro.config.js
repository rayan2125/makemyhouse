const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);



module.exports = mergeConfig(defaultConfig, {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        // Remove 'svg' from assetExts
        assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
        // Add 'svg' to sourceExts
        sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
});
