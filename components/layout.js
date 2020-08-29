import Head from "next/head";
import styles from "./layout.module.scss";

export const siteTitle = "Aurélien Kochalski - Portfolio";

export default function Layout(props) {

    var classes = classNames(
        styles.container
    );

    return (
        <div className={classes}>
            <Head>
                <link rel="icon" href="/favicon.ico" /> {/* TODO : change the favicon */}
                <meta name="description" content=""/> {/* TODO : add meta tags */}
            </Head>
            <main>{props.children}</main>
        </div>
    );
}