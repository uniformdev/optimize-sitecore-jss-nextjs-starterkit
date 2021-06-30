import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * Initializes the i18next library to provide a translation dictionary to the app.
 * If your app is not multilingual, this file and references to it can be removed.
 * @param {string} language Required, the initial language.
 * @param {*} dictionary Optional, the dictionary to load. Used for SSR and when hydrating from SSR; otherwise, the dictionary is loaded via JSS dictionary service.
 */
export function i18init(language, dictionary) {
    // If no language is provided, there's not much for us to do here...
    if (!language) {
        return;
    }

    const options = {
        debug: false,
        lng: language,
        fallbackLng: false, // fallback to keys
        load: 'currentOnly', // e.g. don't load 'es' when requesting 'es-MX' -- Sitecore config should handle this
        useCookie: false, // using URLs and Sitecore to store language context, don't need a cookie
        interpolation: {
            escapeValue: false, // not needed for react
        },
        react: {
            useSuspense: false,
        },
    };

    // We may also have dictionary data deserialized from SSR state, so we can initialize with that
    // if it is present.
    if (dictionary) {
        options.resources = {};
        options.resources[language] = {
            translation: dictionary,
        };
        // The `initImmediate` option is a bit counter-intuitive. Setting the value to `false` will cause `i18n` to
        // initialize synchronously. Otherwise, `i18n` will initialize asynchronously.
        // Note: initializing asynchronously typically means the app will need to handle/render a "language loading" state or
        // initialization will need to happen before the app starts rendering at all - which will generally cause a "flash"
        // to occur in the browser.
        options.initImmediate = false;
    }

    // Note: although `init` returns a promise, initialize may still happen synchronously (prior to the promise resolving),
    // based on the `initImmediate` option.
    return i18n.use(initReactI18next).init(options);
}

export function getCurrentLanguage() {
    if (!isInitialized()) {
        return null;
    }
    return i18n.language;
}

export function isInitialized() {
    return i18n.isInitialized;
}
