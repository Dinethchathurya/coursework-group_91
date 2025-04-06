// import { defineConfig } from "vitest/config";

// export default defineConfig({
//     test :{
//         environment :'jsdom'
//     }
// });


import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: 'jsdom', // Use jsdom for DOM testing
    globals: true, // Enable global functions like expect, it, describe
    setupFiles: './src/setupTests.jsx', // Include your setup file
  },
});
