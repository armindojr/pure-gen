/* eslint new-cap: "off" */

const imports = require('./imports');
const locales = require('./locale');

/**
 *
 * @namespace pure
 */
class Pure {
    constructor() {
        this.locale = this.locale || 'en';
        this.localeFallback = this.localeFallback || 'en';
        this.possibleLocales = [
            'af_ZA', 'ar', 'az', 'cz', 'de', 'de_AT', 'de_CH',
            'el', 'en', 'en_AU', 'en_BORK', 'en_CA', 'en_GB',
            'en_IE', 'en_IND', 'en_NG', 'en_US', 'en_ZA',
            'en_au_ocker', 'es', 'es_MX', 'fa', 'fr', 'fr_CA',
            'fr_CH', 'ge', 'id_ID', 'it', 'ja', 'ko', 'lv',
            'nb_NO', 'nep', 'nl', 'nl_BE', 'pl', 'pt_BR',
            'pt_PT', 'ro', 'ru', 'sk', 'sv', 'tr', 'uk',
            'vi', 'zh_CN', 'zh_TW', 'zu_ZA',
        ];

        this.registeredModules = {
            address: [
                'city',
                'city_prefix',
                'city_suffix',
                'street_suffix',
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
                'name',
                'noun',
                'descriptor',
                'bs_adjective',
                'bs_noun',
                'bs_verb',
                'suffix',
                'prefix',
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
            transport: [
                'vehicleManufacturer',
                'vehicleModel',
                'vehicleType',
                'vehicleFuel',
                'airportName',
            ],
            title: '',
            separator: '',
        };

        this.fake = new imports.Fake(this).fake;
        this.unique = new imports.Unique(this);
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
        this.transport = new imports.Transport(this);
        this.music = new imports.Music(this);
        this.document = new imports.Document(this);
        this.dessert = new imports.Dessert(this);
        this.games = new imports.Games(this);
        this.electricalComponents = new imports.ElectricalComponents(this);
        this.esport = new imports.Esport(this);

        this.populateLocale();
    }

    populateLocale() {
        Object.keys(this.registeredModules).forEach((mod) => {
            if (typeof this.registeredModules[mod] === 'string') {
                return;
            }

            this.registeredModules[mod].forEach((meth) => {
                if (typeof locales[this.locale] === 'undefined'
                    || typeof locales[this.locale][mod] === 'undefined'
                    || typeof locales[this.locale][mod][meth] === 'undefined') {
                    //
                    this.registeredModules[mod][meth] = locales[this.localeFallback][mod][meth];
                } else {
                    this.registeredModules[mod][meth] = locales[this.locale][mod][meth];
                }
            });
        });
    }

    seed(value) {
        this.seedValue = value;
        this.random = new imports.Random(this, this.seedValue);
    }

    setLocale(locale) {
        this.locale = locale;
        this.populateLocale();
    }

    getSeed() {
        return this.random.returnSeed();
    }
}

module.exports = Pure;
