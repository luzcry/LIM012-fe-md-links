const marked = require("marked");
const fs = require("fs");
const Path = require("path");
const {
  lstatSync,
  readdirSync
} = require("fs");
const axios = require('axios');
const http = require('http');

/*const validRoute = (route) => {
  try {
    fs.statSync(route);
    return true;
  } catch (err) {
    return false
  }
};
*/

const mdDirectoryExtractor = (dir, options) => {
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
        /* Is an md file */
        if (path.extname(file) === ".md") {
          results.push(file);
        }
      }
    });
    return results;
  }
  const result = walk(dir);
  if (options.validate) {
    result.forEach((link) => {
      mdLinksValidate(mdLinkExtractor(markdown(link), link), link)
    })
  } else {
    result.forEach((link) => {
      mdLinkExtractor(markdown(link), link);
    })
  }
}
const mdLinksValidate = (links, path) => {

  const fetchPromises = (links) => links.map((link) => axios.get(link.href).then((result) => {
    return {
      ...result,
      ...link,

    }
  }).catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        status: error.response.status,
        statusText: "fail",
        ...link
      }

    } else {
      return {
        status: "404",
        statusText: "fail",
        ...link
      }
    }

  }));
  let allFetchs = (promises) => Promise.all(promises);
  return allFetchs(fetchPromises(links)).then((fetchsResult) => {
    return fetchsResult.map((result) => {
      return {
        href: result.href,
        status: result.status,
        ok: result.statusText,
        path: path,
        text: result.text
      }
    });
  })
}

// console.log(mdLinksValidate(testLinks));

function mdLinkExtractor(markdown, path) {
  let links = [];

  let renderer = new marked.Renderer();

  renderer.link = function (href, _, text) {
    links.push({
      href,
      text,
      path
    });
  };

  marked(markdown, {
    renderer: renderer,
  });

  return links;
}

const markdown = (route) => fs.readFileSync(route).toString();
//let result = mdLinkExtractor(markdown);

const directory = (route) => fs.lstatSync(route).isDirectory();
const file = (route) => fs.lstatSync(route).isFile();

/*const traverseSync = dir => {
  path: dir,
  children: Fs.readdirSync(path).map(file => {
    const path = Path.join(path, file);

   if (directory) {
      traverseSync(path);
      return Fs.lstatSync(path).directory()
    } else if (file) { 
    console.log(getMD());
  };
});
*/
const getMD = (route) => {
  const pathMd = path.extname(route);
  return pathMd === ".md";
};

/*
const traverseSync = (dir, getMD) => ({
    path: dir,
    children: fs.readdirSync(dir).map((file) => {
      const path = Path.join(dir, file);
      const isMd = Path.extname(file) === ".md";
      const isDirectory = fs.lstatSync(path).isDirectory();
      if (isDirectory) {
        traverseSync(path);
      } else if (isMd) {
        console.log("getMD", getMD, path);
        return {
          path,
        };
      } else {
        return {
          path,
        };
      }
    }),
  });
  
  console.log(traverseSync("./test/mocks", getMD));

const getResultInArray = (dir) => {
  let arrayOfMds = fs.readdirSync(dir).filter((file) => {
    console.log(file);
    const path = Path.join(dir, file);
    if (fs.lstatSync(path).isDirectory()) {
      traverseSync(path);
    }
    return path;
  });
  return arrayOfMds;
};

function getMD(path) {
  return console.log(path);
}

files = fs.readdirSync(__dirname);
*/
/*
const fetchPromises = (result) => result.map((result) => fetch(result));
let allFetchs = (promises) => Promise.all(promises);
allFetchs(fetchPromises(result)).then((fetchsResult) => {
  return fetchsResult.map((result) => {
    href: result.url;
    status: result.status;
    text: result.statusText;
  });
});

http.get('result', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);

    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
*/
module.exports = {
  directory,
  markdown,
  getMD,
  mdLinkExtractor,
  file,
  mdLinksValidate,
  mdDirectoryExtractor
}