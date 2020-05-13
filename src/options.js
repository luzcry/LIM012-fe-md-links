const {
    mdLinks
} = require("./API");

const options = (path, options) => {
    if (options === "--validate") {
        return mdLinks(path, {
                validate: true
            })
            .then((links) => printValidate(links));
    };

    if (options === "--stats") {
        return mdlinks(path, {
                validate: true
            })
            .then((links) => printStats(links));
    };

    if (options === "--stats --validate" || options === "--validate --stats") {
        return mdLinks(path, {
                validate: true
            })
            .then((links) => printLinks(links));
    };

    return mdLinks(path, {
            validate: false
        })
        .then((links) => printLinks(links));
};

const printValidate = (links) => {
    console.log("printValidate");

}
const printLinks = (links) => {
    console.log("printLinks");
}
const printStats = (links) => {
    console.log("printStats");
}
module.exports = {
    options
}