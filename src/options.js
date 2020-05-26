const { mdLinks } = require('./api');

const options = (path, opts) => {
  console.log(opts === '--validate');
  if (opts === '--validate') {
    return mdLinks(path, {
      validate: true,
    }).then((links) => printValidate(links));
  }
  console.log(opts === '--stats');
  if (opts === '--stats') {
    return mdLinks(path, {
      validate: false,
    }).then((links) => printStats(links));
  }

  if (opts === '--stats --validate' || opts === '--validate --stats') {
    return mdLinks(path, {
      validate: true,
    }).then((links) => printValidateStats(links));
  }

  return mdLinks(path, {
    validate: false,
  }).then((links) => printLinks(links));
};

const printValidate = (links) => {
  links.forEach((link) => {
    console.log(link.path, link.href, link.status, link.ok, link.text);
  });
};

const printLinks = (links) => {
  links.forEach((link) => {
    console.log(link.path, link.href, link.text);
  });
  console.log();
};
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
const printStats = (links) => {
  const total = links.length;
  const unique = links.map((link) => link.href).filter(onlyUnique);
  console.log(`Total: ${total}`);
  console.log('Unique: ', unique.length);
};

const printValidateStats = (links) => {
  printStats(links);
  const broken = links.filter((link) => {
    return link.ok != 'OK';
  });

  console.log('broken: ', broken.length);
};

module.exports = {
  options,
};
