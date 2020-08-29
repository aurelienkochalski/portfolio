import { getAll } from "../middleware/database";

import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import SectionBlock from "../components/sectionBlock";
import SectionTitle from "../components/sectionTitle";
import ProjectCard from "../components/projectCard";
import ResumeItem from "../components/resume";
import ContactItem from "../components/contactItem";
import LanguageSwitcher from "../components/languageSwitcher";

// FontAwesome import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faCoffee, faEnvelope, faPhone, faMobileAlt, faAt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
// We associate a contact method to a specific icon
const icons = {
    "email": faAt,
    "phone": faPhone,
    "address": faMapMarkerAlt,
    "linkedin": faLinkedinIn
};

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

        // Initial state
        this.state = {
            activeLanguage: "en"
        };

        // Events binding
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    handleLanguageChange(language) {

        // We change language only if it's not already the current language
        if (language != this.state.activeLanguage){
            this.setState({
                activeLanguage: language
            });
        }
    }

    getTranslation(object, key) {

        var language = this.state.activeLanguage;

        if (language == "en") {
            return object[key];
        }
        else {
            if (object.translations != undefined &&
                object.translations[language] != undefined &&
                object.translations[language][key] != undefined) {
                return object.translations[language][key];
            }
            else {
                console.warn("translation not found for", language, "-", key, ", fallback to default translation");
                return object[key];
            }
        }
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

        var contactsList = contacts.map(function (contact, index) {

            // If no icon was found for this contact method, we return null so that the component will not trigger the icon rendering
            var icon = (icons.hasOwnProperty(contact.method) ? icons[contact.method] : null);

            return <ContactItem
                key={contact.value}
                index={index}
                link={contact.link}
                text={contact.value}
                icon={icon} />;
        });

        var skillsList = skills.map(function (skillGroup, index) {

            var skillsElements = skillGroup.elements;

            var skillsElementsRender = skillsElements.map(function (skillElement, index) {
                return (
                    <ResumeItem
                        key={index}
                        title={this.getTranslation(skillElement, "title")}
                        description={this.getTranslation(skillElement, "description")}
                        progression={skillElement.progression}>
                        {this.getTranslation(skillElement, "text")} {/* TODO Use state instead of component method? */}
                    </ResumeItem>
                );
            }, this); // NOTE : we bind this to the map callback to keep the scope for translating

            return (
                <React.Fragment key={skillGroup.title}>
                    <h5 className="mb-5 font-bold uppercase">{this.getTranslation(skillGroup, "title")}</h5>
                    {skillsElementsRender}
                </React.Fragment>
            );
        }, this); // NOTE : we bind this to the map callback to keep the scope for translating

        return (
            <Layout>

                <Head>
                    <title>{siteTitle}</title>
                </Head>

                <div className="container mx-auto">

                    <h1 className="text-4xl leading-tight tracking-wide text-center sm:text-left sm:text-5xl md:text-6xl">{infos.name}</h1>
                    <h2 className="text-lg tracking-wider text-center uppercase sm:text-left sm:text-xl md:text-2xl">- {this.getTranslation(infos, "job")} -</h2>
                    <p className="mt-10">{this.getTranslation(infos, "description")}</p>

                    <div>

                        <SectionBlock>
                            <SectionTitle text={this.getTranslation(infos, "sectionProjects")} />
                            <div className="overflow-visible grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4 lg:gap-12">
                                {projectsList}
                            </div>
                        </SectionBlock>

                        <SectionBlock>
                            <SectionTitle text={this.getTranslation(infos, "sectionResume")} />

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

                        <SectionBlock>
                            <SectionTitle text={this.getTranslation(infos, "sectionContact")} />

                            {/* TODO : temporary picture, change it */}
                            <img
                                className="inline w-20 h-20 mr-6 rounded-full"
                                src="/images/poonicorn.png"
                            />

                            {contactsList}

                        </SectionBlock>

                    </div>

                    <footer className="fixed block px-2 py-1 text-xs text-right rounded-t-sm">
                        Made with
                        <FontAwesomeIcon icon={faHeart} className="icon icon-heart" />
                        and
                        <FontAwesomeIcon icon={faCoffee} className="icon icon-coffee" />
                    </footer>

                    <LanguageSwitcher
                        languages={languages}
                        defaultLanguage={languages[0]}
                        onLanguageChange={(language) => {
                            this.handleLanguageChange(language);
                        }}
                    />

                </div>

            </Layout>
        );
    }
}
