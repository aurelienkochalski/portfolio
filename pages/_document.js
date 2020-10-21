import Document, { Html, Head, Main, NextScript } from 'next/document'

// Custom document to add lang attribute to html tag
class MyDocument extends Document {
    render() {
        return (
            <Html lang="fr"> {/* TODO : Make the language dynamic */}
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
            </Html>
        )
    }
}

export default MyDocument