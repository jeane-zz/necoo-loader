const riot = require('riot-compiler');
const fs = require('fs');
const tagPath = '../each.tag';
const tagSource = fs.readFileSync(tagPath, 'utf8');
const options = {};


const js = riot.compile(tagSource, options, tagPath);
console.log(js);