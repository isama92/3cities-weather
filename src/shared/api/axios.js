import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URI;
const apiKey = process.env.REACT_APP_API_KEY;

const getClient = () => {
    const options = {
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            appid: apiKey,
            format: 'json',
            units: 'metric',
            lang: 'en',
        },
    };

    const client = axios.create(options);

    client.interceptors.request.use(
        (requestConfig) => requestConfig,
        (requestError) => Promise.reject(requestError),
    );

    client.interceptors.response.use(
        (response) => response.data,
        (error) => error,
    );

    return client;
};

export default {
    get(url, conf = {}) {
        return getClient().get(url, conf)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

    delete(url, conf = {}) {
        return getClient().delete(url, conf)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

    head(url, conf = {}) {
        return getClient().head(url, conf)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

    options(url, conf = {}) {
        return getClient().options(url, conf)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

    post(url, data = {}, conf = {}) {
        return getClient().post(url, data, conf)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

    put(url, data = {}, conf = {}) {
        return getClient().put(url, data, conf)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

    patch(url, data = {}, conf = {}) {
        return getClient().patch(url, data, conf)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },
};
