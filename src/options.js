const options = (path, options) => {
    if (options === "--validate") {
        return mdLinks (path, {validate: true})
        .then((links) => optionsStats.printValidate(links));
    };


if (options === "--stats") {
    return mdlinks(path, {validate: true})
    .then((links) => optionsStats.printStats(links));
};

if (options === "--stats --validate" || options === "--validate --stats") {
    return mdlinks (path, {validate: true})
        .then((links) => optionsStats.printLinks(links));
};
return mdlinks(path, { validate: false })
    .then((links) => optionsStats.printLinks(links));
};

module.exports = {
    options
}