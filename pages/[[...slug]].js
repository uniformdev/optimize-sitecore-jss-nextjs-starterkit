import Head from 'next/head';
import MainLayout from '../src/components/MainLayout/MainLayout';
import {
    getPageProps,
    isExportProcess,
    SitecoreContext,
    StaticAssetContextProvider,
} from '@uniformdev/next-jss';
import componentFactory from '../src/componentFactory';
import { useSitecoreTracker } from '@uniformdev/tracking-react';
import { SitecorePersonalizationContextProvider } from '@uniformdev/personalize-react';
import { EsiPlaceholder } from '@uniformdev/esi-jss-react';
import { getBoolEnv } from '@uniformdev/common';

const esiEnabled = getBoolEnv(process.env, 'UNIFORM_OPTIONS_ESI', false);

const SitecoreRoute = ({ layoutData, assetPrefix = '' }) => {
    const route = layoutData?.sitecore?.route;

    const sitecoreContext = layoutData?.sitecore?.context;
    
    useSitecoreTracker(sitecoreContext, {
        type: 'jss',
    });

    return (
        <SitecorePersonalizationContextProvider
            contextData={sitecoreContext}
            personalizationMode="jss-esi"
            sitecoreApiKey="EEFE326B-AFF1-4154-9AE8-2BEB85D4B8CB"
            sitecoreSiteName="uniform-jss-kit"
        >
            <StaticAssetContextProvider assetPrefix={assetPrefix}>
                <Head>
                    <title>{route?.fields?.pageTitle?.value || 'Page'}</title>
                    <link rel="shortcut icon" href="/favicon.ico" />
                </Head>

                <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
                    {esiEnabled && <EsiPlaceholder rendering={route} />}
                    <MainLayout route={route} />
                </SitecoreContext>
            </StaticAssetContextProvider>
        </SitecorePersonalizationContextProvider>
    );
};

// Using Automatic Static Optimization
export async function getStaticPaths() {
    const { getSitecoreStaticPaths } = await import('@uniformdev/next-jss-server');
    if (isExportProcess()) {
        // If we are exporting the site directly or via a publish
        // specify all static paths and let nextjs handle 404
        return {
            paths: await getSitecoreStaticPaths(),
            fallback: false,
        };
    } else {
        // If we are running the site in dynamic preview then
        // handle all paths and render them on the fly
        return {
            paths: [],
            fallback: 'blocking',
        };
    }
}

// This getStaticProps can be used alongside a [...slug] or [[...slug]]
// page within the pages folder.
export async function getStaticProps({ params, locale, defaultLocale, previewData }) {
    const options = {
        previewData,
        routeParams: {
            sitecoreRoute: '/' + (params?.slug?.join('/') || ''),
            lang: locale ?? defaultLocale ?? 'en',
        },
    };
    const props = await getPageProps(options);
    return { props };
}
export default SitecoreRoute;
