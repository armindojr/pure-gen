/**
 * Global assign
 */
const imports = require('./imports');

/**
 *
 * @namespace pure
 */
function Pure(opts) {
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
            'time_zone',
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
        iban: [
            'countryCode',
            'formats',
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
                    if (typeof self.locales[self.locale] === 'undefined'
                        || typeof self.locales[self.locale][d] === 'undefined'
                        || typeof self.locales[self.locale][d][p] === 'undefined') {
                        // certain localization sets contain less data then others.
                        // in the case of a missing definition, use the default localeFallback
                        // to substitute the missing set data
                        // throw new Error('unknown property ' + d + p)
                        return self.locales[self.localeFallback][d][p];
                    }
                    // return localized data
                    return self.locales[self.locale][d][p];
                },
            });
        });
    });

    this.fake = new imports.Fake(this).fake;
    this.unique = new imports.Unique(this).unique;
    this.random = new imports.Random(this);
    this.helpers = new imports.Helpers(this);
    this.name = new imports.Name(this);
    this.address = new imports.Address(this);
    this.company = new imports.Company(this);
    this.finance = new imports.Finance(this);
    this.image = new imports.Image(this);
    this.lorem = new imports.Lorem(this);
    this.hacker = new imports.Hacker(this);
    this.internet = new imports.Internet(this);
    this.database = new imports.Database(this);
    this.phone = new imports.Phone(this);
    this.date = new imports.Date(this);
    this.commerce = new imports.Commerce(this);
    this.system = new imports.System(this);
    this.git = new imports.Git(this);
    this.markdown = new imports.Markdown(this);
    this.vehicle = new imports.Vehicle(this);
    this.airport = new imports.Airport(this);
    this.music = new imports.Music(this);
    this.document = new imports.Document(this);
    this.dessert = new imports.Dessert(this);
    this.games = new imports.Games(this);
    this.electricalComponents = new imports.ElectricalComponents(this);
    this.esport = new imports.Esport(this);

    this.seed = function seed(value) {
        this.seedValue = value;
        this.random = new imports.Random(this, this.seedValue);
    };

    this.setLocale = function setLocale(locale) {
        this.locale = locale;
    };

    this.getSeed = function getSeed() {
        return this.random.returnSeed();
    };
}

module.exports = Pure;
