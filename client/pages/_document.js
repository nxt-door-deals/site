import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
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
