// _document.js file will allow to costomise entire html document
import Document, {Html, Head, Main, NextScript} from 'next/document';
class MyDocuments extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocuments;
