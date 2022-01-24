module.exports = {
  launch: {
    headless: true,
    defaultViewport: {
      width: 320,
      height: 600,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    },
  },
  server: {
    command: "npm run serve",
    port: 8085,
    launchTimeout: 60000,
  },
};
