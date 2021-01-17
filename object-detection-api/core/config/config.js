const _ = require('lodash');
const localConfig = require("../env/local");
const globalConfig = require("../env/global");

class Config {

    static load() {
        switch ((process.env.NODE_ENV || "local").trim()) {
            case "local":
                this.config = localConfig;
                break;
            case "tst": case "dev": case "prod": case "stg":
                this.config = globalConfig;
                break;
            default:
                this.config = localConfig;
                break;
        }
    }

    static get(key) {
        if (this.config[key]) {
            return escape(this.config[key]);
        }
        return false;
    }

    static getAll() {
        return this.config;
    }

    static updateConfig(configuration) {
        this.config = _.merge(this.config, configuration);
    }

}

module.exports = Config;
