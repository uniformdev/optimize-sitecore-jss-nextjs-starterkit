import React from 'react';
import { Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { useSitecoreTracker } from '@uniformdev/tracking-react';
import { SitecorePersonalizationContextProvider } from '@uniformdev/personalize-react';
import { EsiPlaceholder } from '@uniformdev/esi-jss-react';
import { getNullLogger } from '@uniformdev/common';
import { getDefaultConsoleLogger } from '@uniformdev/optimize-common-sitecore';
import styles from "./MainLayout.module.css";
import Footer from "../Footer/Footer";

const enableLogging = true;

export default function MainLayout({ route }) {
  const { sitecoreContext } = useSitecoreContext()
  const esiEnabled = route.placeholders['esi-context']?.length > 0;
  useSitecoreTracker(sitecoreContext, {
    type: 'jss',
    logger: enableLogging ? getDefaultConsoleLogger("Uniform Tracker") : getNullLogger(),
  });
  return (
    <SitecorePersonalizationContextProvider
      contextData={sitecoreContext}
      personalizationMode="jss-esi"
      sitecoreApiKey="eefe326b-aff1-4154-9ae8-2beb85d4b8cb"
      sitecoreSiteName="uniform-jss-kit"
    >
      {esiEnabled && <EsiPlaceholder rendering={route} />}
      <div className={styles.container}>
        <main className={styles.main}>
          <Placeholder name="uniform-jss-kit-content" rendering={route}/>
        </main>
        <Footer/>
      </div>
    </SitecorePersonalizationContextProvider>
  );
};

