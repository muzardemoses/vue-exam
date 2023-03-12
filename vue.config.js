const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    // clear all existing loaders.
    // if you don't do this, the loader below will be appended to
    // existing loaders of the rule.
    svgRule.uses.clear();

    // add replacement loader(s)
    svgRule
      .use("vue-svg-loader")
      .loader("vue-svg-loader")
      .options({
        // optional [svgo](https://github.com/svg/svgo) options
        svgo: {
          plugins: [
            { removeDoctype: true },
            { removeComments: true },
            { removeViewBox: false },
          ],
        },
      });
  },
};
