import Document, { Html, Head, Main, NextScript } from "next/document";
import { serializeEsiLayoutServiceData } from "@uniformdev/esi-jss-ssr";
import { getBoolEnv } from '@uniformdev/common';

const esiEnabled = getBoolEnv(process.env, 'UNIFORM_OPTIONS_ESI', false);

class MyDocument extends Document {
  render() {    
    return (
      <Html>
        <Head />
        <body>
          <Main />
          {esiEnabled ? <EsiNextScript /> : <NextScript />}
        </body>
      </Html>
    );
  }
}

class EsiNextScript extends NextScript {
  static getInlineScriptSource(documentProps) {
    const data = NextScript.getInlineScriptSource(documentProps);
    return serializeEsiLayoutServiceData(JSON.parse(data));
  }

  render() {
    const { docComponentsRendered } = this.context;
    docComponentsRendered.NextScript = true;

    return (
      <script
        id="__NEXT_DATA__"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: EsiNextScript.getInlineScriptSource(this.context),
        }}
      />
    );
  }
}

export default MyDocument;
