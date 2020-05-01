/**
 * Global assign
 */
const Fake = require('./modules/fake');
const Unique = require('./modules/unique');
const Random = require('./modules/random');
const Helpers = require('./modules/helpers');
const Name = require('./modules/name');
const Address = require('./modules/address');
const Company = require('./modules/company');
const Finance = require('./modules/finance');
const Image = require('./modules/image');
const Lorem = require('./modules/lorem');
const Hacker = require('./modules/hacker');
const Internet = require('./modules/internet');
const Database = require('./modules/database');
const Phone = require('./modules/phone_number');
const Date = require('./modules/date');
const Commerce = require('./modules/commerce');
const System = require('./modules/system');
const Git = require('./modules/git');
const Markdown = require('./modules/markdown');
const Vehicle = require('./modules/vehicle');
const Airport = require('./modules/airport');
const Music = require('./modules/music');
const Document = require('./modules/document');
const Dessert = require('./modules/dessert');
const Games = require('./modules/games');
const ElectricalComponents = require('./modules/electrical_components');
const Esport = require('./modules/esport');

/**
 *
 * @namespace pure
 */

class Pure {
    constructor(opts) {
        const self = this;
        const newOpts = opts || {};

        // assign options
        self.locales = self.locales || newOpts.locales || {};
        self.locale = self.locale || newOpts.locale || 'en';
        self.localeFallback = self.localeFallback || newOpts.localeFallback || 'en';

        self.definitions = {};

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
                            return self.locales[self.localeFallback][d][p];
                        }
                        // return localized data
                        return self.locales[self.locale][d][p];
                    },
                });
            });
        });

        this.fake = new Fake(this).fake;
        this.unique = new Unique(this).unique;
        this.random = new Random(this);
        this.helpers = new Helpers(this);
        this.name = new Name(this);
        this.address = new Address(this);
        this.company = new Company(this);
        this.finance = new Finance(this);
        this.image = new Image(this);
        this.lorem = new Lorem(this);
        this.hacker = new Hacker(this);
        this.internet = new Internet(this);
        this.database = new Database(this);
        this.phone = new Phone(this);
        this.date = new Date(this);
        this.commerce = new Commerce(this);
        this.system = new System(this);
        this.git = new Git(this);
        this.markdown = new Markdown(this);
        this.vehicle = new Vehicle(this);
        this.airport = new Airport(this);
        this.music = new Music(this);
        this.document = new Document(this);
        this.dessert = new Dessert(this);
        this.games = new Games(this);
        this.electricalComponents = new ElectricalComponents(this);
        this.esport = new Esport(this);
    }

    seed(value) {
        this.seedValue = value;
        this.random = new Random(this, this.seedValue);
    }

    setLocale(locale) {
        this.locale = locale;
    }

    getSeed() {
        return this.random.returnSeed();
    }
}

module.exports = Pure;
