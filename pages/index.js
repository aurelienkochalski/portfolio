import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getAll } from "../middleware/database";

// This function gets called at build time on server-side only.
export async function getStaticProps() {

    // We retrieve the data and use it to pre-render the page
    const res = await getAll();
    const json = await JSON.parse(res);

    // By returning { props: data... }, the Home component will receive `data` as a prop at build time
    return {
        props: {
            data: json,
        }
    };
}

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        console.log(this.props.data);

        // Data assignation helpers
        const infos = this.props.data.infos;
        const languages = infos.languages;
        const contacts = this.props.data.contacts;
        const projects = this.props.data.projects;
        const skills = this.props.data.skills;

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
