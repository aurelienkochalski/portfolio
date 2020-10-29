import { getAll } from "../middleware/database";

import Head from "next/head";
import ReactTooltip from "react-tooltip";
import { splitArray, buildTranslations } from "../utils/tools";
import LayoutHome from "../components/layoutHome";
import SectionBlock from "../components/sectionBlock";
import SectionTitle from "../components/sectionTitle";
import ProjectCard from "../components/projectCard";
import { ResumeBlock, ResumeColumn } from "../components/resume";
import ContactItem from "../components/contactItem";
import AboutItem from "../components/aboutItem";
import LanguageSwitcher from "../components/languageSwitcher";

import { CSSTransition, TransitionGroup  } from "react-transition-group";

const animationDelayBeforeStarting = 0;
const animationStaggering = 50;

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
        this.defaultLanguage = languages[1];

        // We build the array containing all translations
        this.dataTranslations = []; // NOTE : We declare it as a class variable in order to be accessed inside handleLanguageChange()
        languages.map(function (language, index) {
            this.dataTranslations[language] = buildTranslations({ ...this.props.data }, language); // We keep the data source untouched by copying it
        }, this);

        // Initial state
        this.state = {
            activeLanguage: this.defaultLanguage, // Current language
            dataTranslated: this.dataTranslations[this.defaultLanguage], // A reference to the data translated in the current language
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
        const about = infos.about;

        // TODO : transform those into components
        const projectsList = projects.map(function (project, index) {
            return <ProjectCard
                key={project._id}
                index={index}
                project={project}></ProjectCard>;
        });

        const contactsList = contacts.map(function (contact, index) {
            return <ContactItem
                key={contact.value}
                index={index}
                link={contact.link}
                text={contact.value}
                icon={contact.method} />;
        });

        const aboutList = about.map(function (item, index) {
            return <AboutItem
                index={index}
                text={item}
            />;
        });

        // We dynamically split the skills data in multiple array with an utility function to render inside multiple columns
        const COLUMNS_SKILLS = 2;
        const skillsSplitted = splitArray(skills, Math.ceil(skills.length / COLUMNS_SKILLS));

        const skillsLeft = skillsSplitted[0].map(function (skillGroup, index) {
            return (
                <ResumeBlock
                    key={index}
                    index={index}
                    title={skillGroup.title}
                    elements={skillGroup.elements}
                />
            );
        });

        const skillsRight = skillsSplitted[1].map(function (skillGroup, index) {
            return (
                <ResumeBlock
                    key={index}
                    index={index}
                    title={skillGroup.title}
                    elements={skillGroup.elements}
                />
            );
        });

        return (
            <LayoutHome>

                <div className="container mx-auto">

                    <TransitionGroup>
                        <CSSTransition in={true} key={infos.name} timeout={animationDelayBeforeStarting + 0 * animationStaggering}>
                            <h1 className="pt-6 text-4xl leading-tight tracking-wide text-center sm:pt-0 sm:text-left sm:text-5xl md:text-6xl">{infos.name}</h1>
                        </CSSTransition>
                        <CSSTransition in={true} key={infos.job} timeout={animationDelayBeforeStarting + 1 * animationStaggering}>
                            <h2 className="pt-2 text-sm tracking-wider text-center uppercase sm:pt-0 sm:text-left sm:text-2xl">{infos.job}</h2>
                        </CSSTransition>
                        <CSSTransition in={true} key={infos.description} timeout={animationDelayBeforeStarting + 2 * animationStaggering}>
                            <p className="mt-10 text-lg leading-relaxed justify-hyphens">{infos.description}</p>
                        </CSSTransition>
                    </TransitionGroup>

                    <div>

                        <SectionBlock>
                            <SectionTitle text={infos.sectionProjects} />
                            <div className="overflow-visible grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-12">
                                {projectsList}
                            </div>
                        </SectionBlock>

                        <SectionBlock>
                            <SectionTitle text={infos.sectionResume} />
                            <div className="flex flex-col mb-4 md:flex-row">
                                <ResumeColumn size="2/3" index={0}>{skillsLeft}</ResumeColumn>
                                <ResumeColumn size="1/3" index={1}>{skillsRight}</ResumeColumn>
                            </div>
                        </SectionBlock>

                        <SectionBlock>
                            <SectionTitle text={infos.sectionAbout} />
                            <div 
                                className="justify-hyphens" 
                                data-aos='fade-up' data-aos-delay={animationDelayBeforeStarting + (0 * animationStaggering)}>
                                {aboutList}
                            </div>
                        </SectionBlock>

                        <SectionBlock>
                            <SectionTitle text={infos.sectionContact} />
                            <img
                                className="block w-32 h-32 mx-auto mt-8 mb-12 rounded-full sm:w-24 sm:h-24 sm:inline sm:mr-6 sm:float-left sm:my-0 float:none"
                                src="/images/photo.png"
                                alt="Photo"
                                width="96" 
                                height="96"
                                data-aos='fade-up' data-aos-delay={animationDelayBeforeStarting + (0 * animationStaggering)}
                            />
                            <div className="items-baseline max-w-xs mx-auto sm:max-w-none sm:pl-8 grid grid-cols-1 lg:grid-cols-2">
                                {contactsList}
                            </div>
                        </SectionBlock>

                    </div>

                    <LanguageSwitcher
                        languages={languages}
                        defaultLanguage={this.defaultLanguage}
                        onLanguageChange={(language) => {
                            this.handleLanguageChange(language);
                        }}
                    />

                </div>

                <ReactTooltip place="top" effect="solid" className="tooltip" uuid="tooltip"/>

            </LayoutHome>
        );
    }
}