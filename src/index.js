const imports = require('./imports');
const locales = require('./modules/locales');

/**
 *
 * @namespace pure
 */
function Pure() {
    // assign options
    this.locales = this.locales || locales || {};
    this.locale = this.locale || 'en';
    this.localeFallback = this.localeFallback || 'en';

    this.definitions = {};

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
    Object.keys(definitions).forEach((module) => {
        if (typeof this.definitions[module] === 'undefined') {
            this.definitions[module] = {};
        }

        if (typeof definitions[module] === 'string') {
            this.definitions[module] = definitions[module];
            return;
        }

        definitions[module].forEach((method) => {
            Object.defineProperty(this.definitions[module], method, {
                get: function data() {
                    if (typeof this.locales[this.locale] === 'undefined'
                    || typeof this.locales[this.locale][module] === 'undefined'
                    || typeof this.locales[this.locale][module][method] === 'undefined') {
                        // certain localization sets contain less data then others.
                        // in the case of a missing definition, use the default localeFallback
                        // to substitute the missing data
                        return this.locales[this.localeFallback][module][method];
                    }
                    // return localized data
                    return this.locales[this.locale][module][method];
                }.bind(this),
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

    /**
     * seed
     *
     * @description Method to set specific seed to RNG
     * @param {Number} value Seed value that RNG will use to generate numbers
     * @method pure.seed
     * @example
     * pure.seed(1)
     */
    this.seed = function seed(value) {
        this.seedValue = value;
        this.random = new imports.Random(this, this.seedValue);
    };

    /**
     * setLocale
     *
     * @description
     * If user wants to generate localized data, then this method should be used.
     * </br>Possible locales:
     * </br><b>af_ZA, ar, az, cz, de, de_AT, de_CH, el, en, en_AU, en_BORK, en_CA, en_GB, en_IE, en_IND,
     * en_NG, en_US, en_ZA, en_au_ocker, es, es_MX, fa, fr, fr_CA, fr_CH, ge, id_ID, it, ja, ko,
     * lv, nb_NO, nep, nl, nl_BE, pl, pt_BR, pt_PT, ro, ru, sk, sv, tr, uk, vi, zh_CN, zh_TW, zu_ZA</b>
     * @param {String} locale Locale to be used when generating data
     * @method pure.setLocale
     * @example
     * pure.setLocale('pt_BR')
     *
     */
    this.setLocale = function setLocale(locale) {
        this.locale = locale;
    };

    /**
     * getSeed
     *
     * @description This method returns current seed used by RNG
     * @method pure.getSeed
     * @example
     * console.log(pure.getSeed())
     */
    this.getSeed = function getSeed() {
        return this.random.returnSeed();
    };
}

module.exports = Pure;
