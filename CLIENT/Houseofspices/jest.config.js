// // export default  {

// //     testEnvironment: "jsdom",
 
// //      transform: {
 
// //        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
 
// //      },
 
// //      setupFilesAfterEnv: ['@testing-library/jest-dom'],
 
// //    };
// export default {
//   testEnvironment: "jsdom",
//   reporters: [
//     "default",
//     [
//       "jest-html-reporter",
//       {
//         outputPath: "./public/test-report.html",
//         pageTitle: "Test Report"
//       }
//     ]
//   ],
//   transform: {
//     "^.+\\.(js|jsx)$": "babel-jest"
//   }
// };
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
