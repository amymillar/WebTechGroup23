export default [
    {
      files: ["src/scripts/**/*.js"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      rules: {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "no-unused-vars": "warn",
        "indent": ["error", 2],
      }
    }
  ];
  