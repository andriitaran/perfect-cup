const fs = require("fs");
const uuid = require("uuid/v1");

const writeJSONFile = (filename, content) => {
    console.log(filename, content);
    fs.writeFileSync(filename, JSON.stringify(content), "utf8", err => {
        if (err) {
            console.log(err);
        }
    });
    console.log(`changes saved to file ${filename}...`);
}

const getNewId = () => {
    return uuid();
};

module.exports = {
    writeJSONFile,
    getNewId
};
