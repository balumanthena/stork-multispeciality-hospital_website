module.exports = {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: true
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // IMPORTANT: Prevent stripping IDs since dynamic gradients, inline parsing loaders, and animations require them
          cleanupIds: false,
          // Do not delete gradients/clips defined in defs
          removeUselessDefs: false,
          // Keep shape parameters stable
          convertPathData: {
            floatPrecision: 3, // Preserve subpixel line positioning sharpness
            transformPrecision: 5
          }
        }
      }
    },
    // Safely remove inline style tags that override tailwind classes
    'removeDimensions',
    'sortAttrs'
  ]
};
