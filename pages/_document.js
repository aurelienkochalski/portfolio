import Document, { Html, Head, Main, NextScript } from 'next/document'

// Custom document to add lang attribute to html tag
class MyDocument extends Document {
    render() {
        return (
            <Html lang="fr"> {/* TODO : Make the language dynamic */}
            <Head>
                <link rel="preload" as="font" href="/fonts/custom-medium.woff" type="font/woff" crossorigin="anonymous" />
                <link rel="preload" as="font" href="/fonts/custom-black.woff" type="font/woff" crossorigin="anonymous" />
                <link rel="preload" as="font" href="/fonts/custom-light.woff" type="font/woff" crossorigin="anonymous" />
                <link rel="preload" as="font" href="/fonts/font-icons.woff" type="font/woff" crossorigin="anonymous" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
            </Html>
        )
    }
}

export default MyDocument