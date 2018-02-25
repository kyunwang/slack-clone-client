module.exports = {
  extends: "airbnb",
  plugins: ["react", "jsx-a11y", "import"],
  parser: "babel-eslint",
  env: {
	  browser: 1
  },
  rules: {
    quotes: ["error", "single"],
	 "react/jsx-filename-extension": 0,
	//  "indent": ["error", "tab"],
	// Eslint going weird, so adding these rules
	 "no-tabs": 0,
	 "no-mixed-spaces-and-tabs": 0

  },
  globals: {
    document: 1
  }
};
