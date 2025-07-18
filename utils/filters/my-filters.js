// by Chris Burnell: https://chrisburnell.com/article/some-eleventy-filters/#markdown-format

const markdownParser = require('markdown-it');

const markdown = markdownParser();

module.exports = {
  markdownFormat: (string) => {
    return markdown.render(string);
  },
};
