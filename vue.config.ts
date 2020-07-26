"use strict";

module.exports = {
  devServer: {
    open: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000/",
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        views: "@/views",
        components: "@/components",
        api: "@/api",
        utils: "@/utils"
      }
    }
  }
};
