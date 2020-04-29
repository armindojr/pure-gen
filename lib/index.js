/*

   this index.js file is used for including the pure library as a CommonJS module, instead of a bundle

   you can include the pure library into your existing node.js application by requiring the entire /pure directory

    var pure = require(./pure);
    var randomName = pure.name.findName();

   you can also simply include the "pure.js" file which is the auto-generated bundled version of the pure library

    var pure = require(./customAppPath/pure);
    var randomName = pure.name.findName();


  if you plan on modifying the pure library you should be performing your changes in the /lib/ directory

*/

/**
 * Global assign
 */
const Fake = require('./fake');
const Unique = require('./unique');
const Random = require('./random');
const Helpers = require('./helpers');
const Name = require('./name');
const Address = require('./address');
const Company = require('./company');
const Finance = require('./finance');
const Image = require('./image');
const Lorem = require('./lorem');
const Hacker = require('./hacker');
const Internet = require('./internet');
const Database = require('./database');
const Phone = require('./phone_number');
const Date = require('./date');
const Commerce = require('./commerce');
const System = require('./system');
const Git = require('./git');
const Markdown = require('./markdown');
const Vehicle = require('./vehicle');
const Airport = require('./airport');
const Music = require('./music');
const Document = require('./document');
const Dessert = require('./dessert');
const Games = require('./games');
const ElectricalComponents = require('./electrical_components');
const Esport = require('./esport');

/**
 *
 * @namespace pure
 */

function Pure(opts) {
    const self = this;

    const newOpts = opts || {};

    // assign options
    const locales = self.locales || newOpts.locales || {};
    const locale = self.locale || newOpts.locale || 'en';
    const localeFallback = self.localeFallback || newOpts.localeFallback || 'en';

    self.locales = locales;
    self.locale = locale;
    self.localeFallback = localeFallback;

    self.definitions = {};

    self.fake = new Fake(self).fake;
    self.unique = new Unique(self).unique;
    self.random = new Random(self);
    self.helpers = new Helpers(self);
    self.name = new Name(self);
    self.address = new Address(self);
    self.company = new Company(self);
    self.finance = new Finance(self);
    self.image = new Image(self);
    self.lorem = new Lorem(self);
    self.hacker = new Hacker(self);
    self.internet = new Internet(self);
    self.database = new Database(self);
    self.phone = new Phone(self);
    self.date = new Date(self);
    self.commerce = new Commerce(self);
    self.system = new System(self);
    self.git = new Git(self);
    self.markdown = new Markdown(self);
    self.vehicle = new Vehicle(self);
    self.airport = new Airport(self);
    self.music = new Music(self);
    self.document = new Document(self);
    self.dessert = new Dessert(self);
    self.games = new Games(self);
    self.electricalComponents = new ElectricalComponents(self);
    self.esport = new Esport(self);

    const definitions = {
        address: [
            'city_prefix',
            'city_suffix',
            'street_suffix',
            'city_name',
            'county',
            'country',
            'default_country',
            'country_code',
            'country_code_alpha_3',
            'state',
            'state_abbr',
            'street_prefix',
            'postcode',
            'postcode_by_state',
            'direction',
            'direction_abbr',
        ],
        airport: [
            'name',
            'iataCode',
            'icaoCode',
        ],
        commerce: [
            'color',
            'department',
            'product_name',
            'price',
            'categories',
            'product_description',
        ],
        company: [
            'adjective',
            'noun',
            'descriptor',
            'bs_adjective',
            'bs_noun',
            'bs_verb',
            'suffix',
        ],
        database: [
            'collation',
            'column',
            'engine',
            'type',
        ],
        date: [
            'month',
            'weekday',
        ],
        dessert: [
            'flavor',
            'topping',
            'variety',
        ],
        electricalComponents: [
            'active',
            'passive',
            'electromechanical',
        ],
        esport: [
            'players',
            'teams',
            'events',
            'leagues',
            'games',
        ],
        finance: [
            'account_type',
            'transaction_type',
            'currency',
            'iban',
            'credit_card',
        ],
        games: [
            'title',
            'genre',
            'platform',
        ],
        hacker: [
            'abbreviation',
            'adjective',
            'noun',
            'verb',
            'ingverb',
            'phrase',
        ],
        internet: [
            'avatar_uri',
            'domain_suffix',
            'free_email',
            'example_email',
            'password',
        ],
        lorem: [
            'words',
            'sentences',
        ],
        music: [
            'genre',
        ],
        name: [
            'first_name',
            'last_name',
            'prefix',
            'suffix',
            'gender',
            'title',
            'male_prefix',
            'female_prefix',
            'male_first_name',
            'female_first_name',
            'male_middle_name',
            'female_middle_name',
            'male_last_name',
            'female_last_name',
        ],
        phone_number: [
            'formats',
        ],
        system: [
            'mimeTypes',
            'directoryPaths',
        ],
        vehicle: [
            'vehicle',
            'manufacturer',
            'model',
            'type',
            'fuel',
            'vin',
            'color',
        ],
        title: '',
        separator: '',
    };

    // Create a Getter for all definitions.foo.bar properties
    Object.keys(definitions).forEach((d) => {
        if (typeof self.definitions[d] === 'undefined') {
            self.definitions[d] = {};
        }

        if (typeof definitions[d] === 'string') {
            self.definitions[d] = definitions[d];
            return;
        }

        definitions[d].forEach((p) => {
            Object.defineProperty(self.definitions[d], p, {
                get() {
                    const verification1 = (typeof self.locales[self.locale][d] === 'undefined');
                    if (verification1 || typeof self.locales[self.locale][d][p] === 'undefined') {
                        // certain localization sets contain less data then others.
                        // in the case of a missing definition, use the default localeFallback
                        //  to substitute the missing set data
                        // throw new Error('unknown property ' + d + p)
                        return self.locales[localeFallback][d][p];
                    }
                    // return localized data
                    return self.locales[self.locale][d][p];
                },
            });
        });
    });
}

Pure.prototype.setLocale = function setLocale(locale) {
    this.locale = locale;
};

Pure.prototype.seed = function seed(value) {
    this.seedValue = value;
    this.random = new Random(this, this.seedValue);
};
module.exports = Pure;
