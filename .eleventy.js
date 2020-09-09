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

  config.addPassthroughCopy("./src/assets/");

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
