const Data = require("./data");

function Get(user) {
    let Balance = Data.Get();
    if (user == undefined) return;
    return Balance[user];
}

function Give(user, money) {
    if (user == undefined || money == undefined) return;
    let Balance = Data.Get();
    Balance[user] += money;
    return Data.Send(Balance);
}

function Take(user, money) {
    if (user == undefined || money == undefined) return;
    let Balance = Data.Get();
    if (money > Balance[user]) return;
    Balance[user] -= money;
    return Data.Send(Balance);
}

function CanAfford(user, money) {
    if (user == undefined || money == undefined) return;
    let Balance = Data.Get();
    let canAfford = (Balance[user] > money) ? true : false;
    return canAfford;
}

module.exports = { Get, Give, Take, CanAfford }