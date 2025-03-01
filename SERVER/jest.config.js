module.exports = {
  reporters: [
    "default",
    ["jest-json-reporter", {
      "outputPath": "./test-reports.json"
    }]
  ]
};
