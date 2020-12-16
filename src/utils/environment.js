const currentEnvironment = "development";
const currentVersion = "sole_practitioner_app";

const env = {
    development: {
        rest: "http://localhost:5000/api"
    },
    stage: {
        rest: "https://api.hadiaamir.me/api"
    },
    production: {
        rest: "https://api.counselconnect.ca/api"
    }
}


const ver = {
    sole_practitioner_app: {
        version: "3.6"
    }
}


const environment = {

      /**
     * Returns the environment endpoints set above
     *
     * @return {String}
     */
    resolveApi: () => {
        return env[currentEnvironment];
    },

    resolveVersion: () => {
        return ver[currentVersion];
    }


}   

export default environment;
