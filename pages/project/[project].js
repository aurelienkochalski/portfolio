import React from "react";
import { withRouter } from "next/router";
import LayoutProject from "../../components/layoutProject";
import ProjectView from "../../components/projectView";
import {getProjects, getProject} from "../../middleware/database";
import Head from "next/head";

// NOTE : For this page, we are using the dynamic routing functionnality of nextjs
// NOTE : In dev, those pages will trigger a 404 if refreshed or accessed directly (by uri). That's because nextjs default server does not handle dynamic routing data forwarding. But it's ok in prod because the data are pre-fetched.

// Needed because we use dynamic routing, in order to discover all possible path to pre-render. Gets called only at build time in prod.
export async function getStaticPaths() {

    // We retrieve all the projects
    const projects = await getProjects();

    // We get the paths to pre-render based on projects
    const paths = projects.map((project) => ({
        params: { project: project.slug },
    }));

    // We'll pre-render these paths at build time. Fallback set to false means that other routes should 404.
    return { paths, fallback: false };
}

// Needed to pre-fetch data of a specific project. Gets called only at build time in prod.
export async function getStaticProps({ params }) {

    // We retrieve the data about the project and use it to pre-render the page
    const project = await getProject(params.project); // This params key depends on the dynamic route api path returned in getStaticPaths()
    const json = await JSON.parse(project);

    return {
        props: {
            data: json,
        },
    };
}

class Project extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const project = this.props.data;

        // TODO TEMP : The projects are not translated yet, so for now, we manually retrieve the title, category and description
        project.title = project.translations.fr.title ? project.translations.fr.title : project.title;
        project.category = project.translations.fr.category ? project.translations.fr.category : project.category;
        project.description = project.translations.fr.description ? project.translations.fr.description : project.description;

        return (
            <>
                <Head>
                    {/* We specifically ask to crawlers to not indexing the projects pages */}
                    <meta name="robots" content="noindex" />
                </Head>
                <LayoutProject 
                    seotitle={project.title}
                    seodescription={project.description}
                >

                    <ProjectView
                        title={project.title}
                        category={project.category}
                        description={project.description}
                        technologies={project.technologies.join(" / ")}
                        authors={project.copyright}
                        gallery={project.images}
                    />
                    
                </LayoutProject>
            </>
        );
    }
}
export default withRouter(Project); // NOTE : We have to use `withRouter` instead of `useRouter` when using a class component