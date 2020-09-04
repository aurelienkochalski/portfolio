import { getAll } from "../middleware/database";

import Head from "next/head";
import ReactTooltip from "react-tooltip";
import { splitArray, buildTranslations } from "../utils/tools";
import Layout, { siteTitle } from "../components/layout";
import SectionBlock from "../components/sectionBlock";
import SectionTitle from "../components/sectionTitle";
import ProjectCard from "../components/projectCard";
import { ResumeBlock, ResumeColumn } from "../components/resume";
import ContactItem from "../components/contactItem";
import LanguageSwitcher from "../components/languageSwitcher";

import { CSSTransition, TransitionGroup  } from "react-transition-group";

const animationDelayBeforeStarting = 200;
const animationStaggering = 100;

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

        const languages = this.props.data.infos.languages;
        const defaultLanguage = languages[0];

        // We build the array containing all translations
        this.dataTranslations = []; // NOTE : We declare it as a class variable in order to be accessed inside handleLanguageChange()
        languages.map(function (language, index) {
            this.dataTranslations[language] = buildTranslations({ ...this.props.data }, language); // We keep the data source untouched by copying it
        }, this);

        // Initial state
        this.state = {
            activeLanguage: defaultLanguage, // Current language
            dataTranslated: this.dataTranslations[defaultLanguage], // A reference to the data translated in the current language
        };

        // Events binding
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    handleLanguageChange(language) {

        // We change language only if it's not already the current language
        if (language != this.state.activeLanguage){
            this.setState({
                activeLanguage: language,
                dataTranslated: this.dataTranslations[language]
            });
        }
    }

    render() {

        // Data assignation helpers
        const data = this.state.dataTranslated;
        const infos = data.infos;
        const languages = infos.languages;
        const contacts = data.contacts;
        const projects = data.projects;
        const skills = data.skills;

        // TODO : transform those into components
        var projectsList = projects.map(function (project, index) {
            return <ProjectCard
                key={project._id}
                index={index}
                project={project}></ProjectCard>;
        });

        var contactsList = contacts.map(function (contact, index) {
            return <ContactItem
                key={contact.value}
                index={index}
                link={contact.link}
                text={contact.value}
                icon={contact.method} />;
        });

        // We dynamically split the skills data in multiple array with an utility function to render inside multiple columns
        const COLUMNS_SKILLS = 3;
        const skillsSplitted = splitArray(skills, Math.ceil(skills.length / COLUMNS_SKILLS));

        var skillsColumns = skillsSplitted.map(function (skillColumn, index) {

            var skillsBlock = skillColumn.map(function (skillGroup, index) {
                return (
                    <ResumeBlock
                        key={skillGroup._id}
                        title={skillGroup.title}
                        elements={skillGroup.elements}
                    />
                );
            });

            return (
                <ResumeColumn index={index} columns={COLUMNS_SKILLS}>{skillsBlock}</ResumeColumn>
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
                    <p className="mt-10 text-lg">{infos.description}</p>

                    <div>

                        <SectionBlock>
                            <SectionTitle text={infos.sectionProjects} />
                            <div className="overflow-visible grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4 lg:gap-12">
                                {projectsList}
                            </div>
                        </SectionBlock>

                        <SectionBlock>
                            <SectionTitle text={infos.sectionResume} />
                            <div className="flex flex-col mb-4 md:flex-row">
                                {skillsColumns}
                            </div>
                        </SectionBlock>

                        <SectionBlock>
                            <SectionTitle text={infos.sectionContact} />
                            {/* TODO : temporary picture, change it */}
                            <img
                                className="inline w-20 h-20 mr-6 rounded-full"
                                src="/images/poonicorn.png"
                                data-aos='fade-up' data-aos-delay={animationDelayBeforeStarting + (0 * animationStaggering)}
                            />
                            {contactsList}
                        </SectionBlock>

                    </div>

                    <footer className="fixed block px-2 py-1 text-xs text-right rounded-t-sm">
                        Made with
                        <span className="fonticon icon-heart"></span>
                        and
                        <span className="fonticon icon-coffee"></span>
                    </footer>

                    <LanguageSwitcher
                        languages={languages}
                        defaultLanguage={languages[0]}
                        onLanguageChange={(language) => {
                            this.handleLanguageChange(language);
                        }}
                    />

                </div>

                <ReactTooltip place="top" effect="solid" className="tooltip" uuid="tooltip"/>

            </Layout>
        );
    }
}