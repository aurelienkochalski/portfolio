import { withRouter } from "next/router";
import Link from "next/link";
import ProjectView from "../../components/projectView";
import {getProjects, getProject} from "../../middleware/database";

// NOTE : For this page, we are using the dynamic routing functionnality of nextjs

// Needed because we use dynamic routing, in order to discover which paths we want to pre-render. Gets called only at build time.
export async function getStaticPaths() {

    // We retrieve all the projects
    const projects = await getProjects();

    // We get the paths to pre-render based on projects
    const paths = projects.map((project) => "/project/" + project.title);

    // We'll pre-render these paths at build time. Fallback set to false means that other routes should 404.
    return { paths, fallback: false };
}

// Needed to pre-render a specific project. Gets called only at build time.
export async function getStaticProps({ params }) {

    // We retrieve the data about the project and use it to pre-render the page
    const project = await getProject(params.project); // This params key depends on the dynamic route api path
    const json = await JSON.parse(project);

    return {
        props: {
            data: json,
        },
    };
}

class Post extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const project = this.props.data;

        return (
            <>

                <Link href="/" scroll={false}>{/* `scroll` set to false allows us to restore the scroll position when returning to the homepage */}
                    <a className="fixed top-0 right-0 z-10 px-4 py-2">← Back</a>
                </Link>

                <ProjectView
                    title={project.title}
                    category={project.category}
                    description={project.description}
                    technologies={project.technologies.join(" / ")}
                    gallery={project.images}
                />
            </>
        );
    }
}
export default withRouter(Post); // NOTE : We have to use `withRouter` instead of `useRouter` when using a class component