module.exports = (config) => {
  config.addFilter("flatten", (array) => [].concat(...array));

  config.addFilter("customSlug", (string) =>
    string.toLowerCase().replace(/\ /g, "-")
  );
  config.addFilter("bookTitle", (string) => string.split("/")[0]);
  config.addFilter("readableBookAndChapter", (string) =>
    string.replace(/\//g, " ")
  );
  config.addFilter("currentChapter", string => Number(string.split('/')[1]))

  const commonWords = ['a', 'and', 'of', 'the']
  config.addFilter("filterCommonWords", array => array.filter(([word]) => !commonWords.includes(word)))

  config.addPassthroughCopy("./src/styles/");

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: "/word-frequency-by-chapter/",
    dir: {
      input: "src",
      output: "docs",
    },
  };
};
