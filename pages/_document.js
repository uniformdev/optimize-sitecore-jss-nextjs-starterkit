import Document, { Html, Head, Main, NextScript } from "next/document";
import { serializeEsiLayoutServiceData } from "@uniformdev/esi-jss-ssr";

class MyDocument extends Document {
  render() {
    const { UNIFORM_OPTIONS_ESI } = process.env || {};
    return (
      <Html>
        <Head />
        <body>
          <Main />
          {UNIFORM_OPTIONS_ESI === "true" ? <EsiNextScript /> : <NextScript />}
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
