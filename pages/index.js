import { getAll } from "../middleware/database";

import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import SectionBlock from "../components/sectionBlock";
import SectionTitle from "../components/sectionTitle";
import ProjectCard from "../components/projectCard";
import ResumeItem from "../components/resume";

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

        // Data assignation helpers
        const infos = this.props.data.infos;
        const languages = infos.languages;
        const contacts = this.props.data.contacts;
        const projects = this.props.data.projects;
        const skills = this.props.data.skills;

        // TODO : transform those into components
        var projectsList = projects.map(function (project, index) {
            return <ProjectCard
                key={project.title}
                index={index}
                project={project}></ProjectCard>;
        });

        var skillsList = skills.map(function (skillGroup, index) {

            var skillsElements = skillGroup.elements;

            var skillsElementsRender = skillsElements.map(function (skillElement, index) {
                return (
                    <ResumeItem
                        key={index}
                        title={skillElement.title}
                        description={skillElement.description}
                        progression={skillElement.progression}>
                        {skillElement.text} {/* TODO Use state instead of component method */}
                    </ResumeItem>
                );
            });

            return (
                <React.Fragment key={skillGroup.title}>
                    <h5 className="mb-5 font-bold uppercase">{skillGroup.title}</h5>
                    {skillsElementsRender}
                </React.Fragment>
            );
        });

        return (
            <Layout>

                <Head>
                    <title>{siteTitle}</title>
                </Head>

                <div className="container mx-auto">

                    <h1 className="text-4xl leading-tight tracking-wide text-center sm:text-left sm:text-5xl md:text-6xl">{infos.name}</h1>
                    <h2 className="text-lg tracking-wider text-center uppercase sm:text-left sm:text-xl md:text-2xl">- {infos.job} -</h2>
                    <p className="mt-10">{infos.description}</p>

                    <div>

                        <SectionBlock>
                            <SectionTitle text="Projects" />
                            <div className="overflow-visible grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4 lg:gap-12">
                                {projectsList}
                            </div>
                        </SectionBlock>

                        <SectionBlock>
                            <SectionTitle text="Resume" />

                            {/* TODO : separate in columns in this order : Dev skills, languages | personnal skills, interests | experience, education*/}
                            <div className="flex flex-col mb-4 md:flex-row">
                                <div className="w-full mr-8 md:w-1/3">
                                    {skillsList}
                                </div>
                                <div className="w-full mr-8 md:w-1/3">

                                </div>
                                <div className="w-full mr-8 md:w-1/3">

                                </div>
                            </div>
                        </SectionBlock>

                    </div>

                </div>

            </Layout>
        );
    }
}
