const {
  file,
  directory,
  mdLinkExtractor,
  markdown,
  mdLinksValidate,
  mdDirectoryExtractor
} = require("./utilities");
const path = require('path');
const fs = require("fs");
let route = "./test/mocks";

export const mdLinks = (route, option) => {
  const promise1 = new Promise((resolve, reject) => {
    if (file(route)) {
      if (option.validate) {
        resolve(mdLinksValidate(mdLinkExtractor(markdown(route), route)))
      }
      resolve(mdLinkExtractor(markdown(route), route))
    } else if (directory(route)) {
      resolve(mdDirectoryExtractor(route, option))
    } else {
      console.log(3);
      reject(new Error("No es una ruta o un archivo válido"))
    }
  });
  return promise1;
};

mdLinks(route, {
  validate: true
}).then(response => {
  console.log(response);
}).catch((error) => console.error(error))