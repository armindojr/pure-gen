import * as imports from './imports.js';
import en from 'pure-locale-en';

/**
 *
 * @namespace pure
 */
class Pure {
    constructor(locale) {
        this.registeredModules = locale || en;

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

        this.random = new imports.Random(this);
        this.fake = new imports.Fake(this);
        this.unique = new imports.Unique(this);
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
    }

    seed(value) {
        this.seedValue = value;
        this.random = new imports.Random(this, this.seedValue);
    }

    setLocale(locale) {
        this.registeredModules = locale;
    }

    getSeed() {
        return this.random.returnSeed();
    }
}

export default Pure;
