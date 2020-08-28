import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Layout>

                <Head>
                    <title>{siteTitle}</title>
                </Head>

                <div className="container mx-auto">
                    <h1 className="text-4xl text-center">Title</h1>
                </div>

            </Layout>
        );
    }
}
