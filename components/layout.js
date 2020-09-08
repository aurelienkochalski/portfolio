import Head from "next/head";
import styles from "./layout.module.scss";

export const siteTitle = "Aurélien Kochalski - Portfolio";

export default function Layout(props) {

    var classes = classNames(
        "p-12",
        styles.container
    );

    return (
        <div className={classes}>
            <Head>
                {/* NOTE : Favicon generated using realfavicongenerator.net */}
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
                <link rel="manifest" href="/favicon/site.webmanifest"/>
                <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#444444"/>
                <link rel="shortcut icon" href="/favicon/favicon.ico"/>
                <meta name="msapplication-TileColor" content="#777777"/>
                <meta name="msapplication-config" content="/favicon/browserconfig.xml"/>
                <meta name="theme-color" content="#ffffff"/>

                <meta name="description" content=""/> {/* TODO : add meta tags */}
            </Head>
            <main>{props.children}</main>
        </div>
    );
}