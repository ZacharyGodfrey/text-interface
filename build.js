// Dependencies

const path = require('path');
const fs = require('fs-extra');
const scss = require('node-sass');

// Helper Functions

const resolve = (filePath) => path.resolve(path.join(__dirname, filePath));
const readFile = (filePath, encoding) => fs.readFileSync(resolve(filePath), { encoding: encoding || 'utf-8' });
const writeFile = (filePath, content, encoding) => fs.outputFileSync(resolve(filePath), content, { encoding: encoding || 'utf-8' });
const emptyFolder = (folderPath) => fs.emptyDirSync(resolve(folderPath));

const compileSCSS = (fileContent) => scss.renderSync({
    data: fileContent,
    outputStyle: 'compressed'
}).css.toString().trim();

// Read Input

const index = readFile('./src/index.html');
const favicon = readFile('./src/favicon.png', 'base64');
const style = compileSCSS(readFile('./src/style.scss'));
const script = readFile('./src/script.js');

// Write Output

const page = index
    .replace('/* favicon */', favicon)
    .replace('/* style */', style)
    .replace('/* script */', script);

emptyFolder('./dist');
writeFile('./dist/index.html', page);