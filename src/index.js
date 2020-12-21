/* eslint new-cap: "off" */

const modules = require('./modules');
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

        Object.keys(modules).forEach((mod) => {
            if (mod === 'fake') {
                this[mod] = new modules[mod](this).fake;
            } else {
                this[mod] = new modules[mod](this);
            }
        });

        this.populateLocale();
    }

    populateLocale() {
        Object.keys(this.registeredModules).forEach((mod) => {
            if (typeof this.registeredModules[mod] === 'undefined') {
                this.registeredModules[mod] = {};
            }

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

    /**
     * seed
     *
     * @description Method to set specific seed to RNG
     * @param {Number} value Seed value that RNG will use to generate numbers
     * @method pure.seed
     * @example
     * pure.seed(1)
     */
    seed(value) {
        this.seedValue = value;
        this.random = new modules.random(this, this.seedValue);
    }

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
    setLocale(locale) {
        this.locale = locale;
        this.populateLocale();
    }

    /**
     * getSeed
     *
     * @description This method returns current seed used by RNG
     * @method pure.getSeed
     * @example
     * console.log(pure.getSeed())
     */
    getSeed() {
        return this.random.returnSeed();
    }
}

module.exports = Pure;
