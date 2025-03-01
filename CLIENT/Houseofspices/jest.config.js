import path from "path";

export default {
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        outputPath: path.resolve("public", "test-report.html"),
        pageTitle: "Test Report",
        includeFailureMsg: true
      }
    ]
  ]
};
