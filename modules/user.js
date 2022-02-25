const Config = require("../config/config.json");
const Data = require("./data");


function Exists(user) {
    let Users = Data.Get();
    let userExists = (Users[user] == undefined) ? false : true;
    return userExists;
}

function Join(user) {
    let Users = Data.Get();
    Users[user] = Config.amount.start;
    return Data.Send(Users);
}

module.exports = { Exists, Join }