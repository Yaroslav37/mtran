const {spaceText, splitIgnoringQuotes} = require('./service');
const fs = require('fs');
const analyze = require('./lexer');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const spacedText = spaceText(data);
    listOfElements = splitIgnoringQuotes(spacedText, ' ');
    console.table(analyze(listOfElements));
});
