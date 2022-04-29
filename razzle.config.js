"use strict";

module.exports = {
  modifyWebpackConfig: ({ env: { target }, webpackConfig, webpackObject }) => {
    const appConfig = { ...webpackConfig };

    if (target === "node") {
      appConfig.externals = [];
    }

    return appConfig;
  },
};
