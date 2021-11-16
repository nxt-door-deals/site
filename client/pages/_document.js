import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { config, dom } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <Script>{dom.css()}</Script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <style jsx global>{`
            /* Other global styles such as 'html, body' etc... */
            body {
              fontfamily: "axiforma";
            }

            #__next {
              height: 200%;
            }
          `}</style>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
