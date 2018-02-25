module.exports = {
  extends: "airbnb",
  plugins: ["react", "jsx-a11y", "import"],
  parser: "babel-eslint",
  rules: {
    quotes: ["error", "single"],
	 "react/jsx-filename-extension": 0,
	//  "indent": ["error", "tab"],
	//  "no-tabs": 0
  },
  globals: {
    document: 1
  }
};
