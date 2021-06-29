import i18n from 'i18next';
import { dataFetcher } from './dataFetcher';
import { isInitialized } from './i18n';
import { dictionaryDataPipeline, fetchDictionaryData } from '@uniformdev/next-jss';
import { getNextServerConfig } from '@uniformdev/next';

export async function configureServerDictionaryPipeline(language) {
    dictionaryDataPipeline.addStep([
        {
            name: 'i18n',
            run: async (context) => {
                const dictionary = await getDictionaryData(context.language);
                return {
                    ...context,
                    dictionary,
                };
            },
        },
    ]);
}

async function getDictionaryData(language) {
    if (isInitialized() && language === i18n.language) {
        return i18n.getDataByLanguage(language);
    }
    const { sitecoreSiteName, sitecoreApiHost, sitecoreApiKey, jssAppName } = getNextServerConfig();

    return fetchDictionaryData(language, {
        dataFetcher: dataFetcher,
        sitecoreSiteName,
        sitecoreApiKey,
        sitecoreApiHost,
        jssAppName,
    });
}
