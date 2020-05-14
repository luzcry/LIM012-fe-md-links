const fs = require('fs');
const {
  file,
  directory,
  mdLinkExtractor,
  markdown,
  mdLinksValidate,
  mdDirectoryExtractor,
} = require('./utilities');

const route = './test/mocks';

const mdLinks = (route, option) => {
  const promise1 = new Promise((resolve, reject) => {
    if (file(route)) {
      if (option.validate) {
        resolve(mdLinksValidate(mdLinkExtractor(markdown(route), route)));
      }
      resolve(mdLinkExtractor(markdown(route), route));
    } else if (directory(route)) {
      resolve(mdDirectoryExtractor(route, option));
    } else {
      console.log(3);
      reject(new Error('No es una ruta o un archivo válido'));
    }
  });
  return promise1;
};

module.exports = {
  mdLinks
}