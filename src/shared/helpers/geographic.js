const it = 'it';
const uk = 'uk';
const fr = 'fr';
const es = 'es';
const us = 'us';
const defaultCountry = it;
const map = {
    turin: it,
    milan: it,
    rome: it,
    london: uk,
    paris: fr,
    madrid: es,
    miami: us,
    'washington dc': us,
};

export const getCountryByCity = (city) => {
    if (typeof city !== 'string') return defaultCountry;
    return map[city.toLowerCase()] || defaultCountry;
};
