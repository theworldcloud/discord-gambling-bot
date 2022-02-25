const fs = require("fs");

function Get() {
    let data = fs.readFileSync("./config/balance.json");
    let json = JSON.parse(data);
    return json;
}

function Send(data) {
    let newData = JSON.stringify(data);
    let oldData = fs.readFileSync("./config/balance.json");
    if (newData != oldData) {
        fs.writeFileSync("./config/balance.json", newData);
    }
}

module.exports = { Send, Get };