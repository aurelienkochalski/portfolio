import styles from "./layoutProject.module.scss";
import Head from "next/head";
import Favicon from "./favicon";
import { SEO_TITLE, SEO_DESCRIPTION } from "../config";

export default function LayoutProject(props) {

    return (
        <div>

            <Head>
                <title key="title">{SEO_TITLE} - Project {props.seotitle}</title>
                {/* TODO : waiting for a fix for duplicate meta tags, see https://github.com/vercel/next.js/discussions/17020 <meta name="description" key="description" content={props.seodescription}/>*/}
                <Favicon/>
            </Head>

            <main>{props.children}</main>
            
        </div>
    );
}


