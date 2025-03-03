import { useEffect } from 'react';
import Head from 'next/head';
import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import MainLayout from '../src/components/MainLayout/MainLayout';
import {
    getPageProps,
    SitecoreContext,
    StaticAssetContextProvider,
} from '@uniformdev/next-jss';
import componentFactory from '../src/componentFactory';
import * as uniformdev from '@uniformdev/optimize-js';

if (typeof window !== 'undefined') {
  window.uniformdev = uniformdev;
}

const SitecoreRoute = ({ layoutData, assetPrefix = '' }) => {
    useEffect(() => {
        // Refresh Experience Editor markup and JS after Next.js Fast Refresh
        handleEditorFastRefresh();
    }, []);

    const route = layoutData?.sitecore?.route;
    return (
        <StaticAssetContextProvider assetPrefix={assetPrefix}>
            <Head>
                <title>{route?.fields?.pageTitle?.value || 'Page'}</title>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>

            <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
                <MainLayout route={route} />
            </SitecoreContext>
        </StaticAssetContextProvider>
    );
};

// Using Automatic Static Optimization
export async function getStaticPaths() {
    const { getSitecoreStaticPaths } = await import('@uniformdev/next-jss-server');
    if (process.env.UNIFORM_BUILD_MODE !== 'ssr') {
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
