import React from 'react';
import NextApp from 'next/app';
import { i18init, isInitialized as isI18nInitialized } from '../src/i18n';
import '../styles/style.css';
import { configureServerDictionaryPipeline } from '../src/configureServerDictionaryPipeline';

if (typeof window === 'undefined') {
    require('@uniformdev/next-jss-server').configure();
    configureServerDictionaryPipeline();
}

export default class App extends NextApp {
    render() {
        const { Component, pageProps } = this.props;
        // If i18n is not initialized, then do so.
        if (!isI18nInitialized()) {
            // `pageProps.dictionary` _should_ already be defined at this point, both
            // in SSR and client-side hydration.
            // Therefore, our i18init function will set an option to immediately
            // initialize the i18n instance instead of initializing i18n asynchronously.
            i18init(pageProps.language, pageProps.dictionary);
        }
        return <Component {...pageProps} />;
    }
}
