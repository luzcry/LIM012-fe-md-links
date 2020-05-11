const {
  file,
  directory,
  mdLinkExtractor,
  markdown,
  mdLinksValidate
} = require("./utilities");
const path = require('path');
const fs = require("fs");
let route = "./test/mocks";

const mdLinks = (route, option) => {
  const promise1 = new Promise((resolve, reject) => {

    if (file(route)) {
      if (option.validate) {
        resolve(mdLinksValidate(mdLinkExtractor(markdown(route)), route))
      }
      resolve(mdLinkExtractor(markdown(route), route))
    } else if (directory(route)) {
      var walk = function (dir) {
        var results = [];
        var list = fs.readdirSync(dir);
        list.forEach(function (file) {
          file = dir + '/' + file;
          var stat = fs.statSync(file);
          if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
          } else {
            /* Is a file */
            if (path.extname(file) === ".md") {
              results.push(file);
            }
          }
        });
        return results;
      }
      console.log(walk(route))
    } else {
      console.log(3);

      reject(new Error("No es una ruta o un archivo válido"))
    }
  });
  return promise1;
};

mdLinks(route, {
  validate: false
}).then(response => {
  console.log(response);
}).catch((error) => console.error(error))