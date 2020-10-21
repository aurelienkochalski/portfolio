import styles from "./layoutHome.module.scss";
import Head from "next/head";
import Favicon from "../components/favicon";
import { SEO_TITLE, SEO_DESCRIPTION } from "../config";

export default function LayoutHome(props) {

    var classes = classNames(
        "relative p-8 sm:p-12 mt-12 mb-0 sm:mb-12 mx-auto",
        styles.container
    );

    return (
        <div className={classes}>

            <Head>
                <title key="title">{SEO_TITLE} - Portfolio</title>
                <meta name="description" key="description" content={SEO_DESCRIPTION}/>
                <Favicon/>
            </Head>

            <main>{props.children}</main>

            <footer className="absolute bottom-0 right-0 block w-full px-2 py-2 text-xs text-center rounded-t-sm opacity-75 sm:py-1 sm:fixed sm:w-auto sm:text-right">
                        Made with
                <span className="fonticon icon-heart"></span>
                        and
                <span className="fonticon icon-coffee"></span>
            </footer>
            
        </div>
    );
}