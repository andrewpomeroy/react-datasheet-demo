module.exports = {
  root: true,
  "extends": "react-app",
  "plugins": ["prettier"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
      },
    ],
  }
}