import Document, { Html, Head, Main, NextScript } from 'next/document';
import { serializeEsiLayoutServiceData } from '@uniformdev/esi-jss-ssr';
import { getBoolEnv } from '@uniformdev/common';
import { UniformDebug } from '@uniformdev/next';

const esiEnabled = getBoolEnv(process.env, 'UNIFORM_OPTIONS_ESI', false);
if (esiEnabled) {
    const _getInlineScriptSource = NextScript.getInlineScriptSource;
    NextScript.getInlineScriptSource = (documentProps) => {
        const data = _getInlineScriptSource(documentProps);
        return serializeEsiLayoutServiceData(JSON.parse(data));
    };
}

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <UniformDebug />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
