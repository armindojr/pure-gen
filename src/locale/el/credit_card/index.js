const credit_card = {
    visa: require('./visa'),
    mastercard: require('./mastercard'),
    discover: require('./discover'),
    american_express: require('./american_express'),
    maestro: require('./maestro'),
};
module.exports = credit_card;
