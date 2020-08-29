import styles from "./projectCard.module.scss";

import Link from "next/link";

// TODO : make it global (we will certainly need it for the project page)
function sanitizeTechnology(str) {

    // Specific technology replacement
    str = str.replace(/#/g, "sharp");

    // Global sanitizing (lowercase, white space triming, specialchars replacement)
    str = str.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

    return str;
}

export default class ProjectCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        var classes = classNames(
            styles.card,
            "max-w-sm"
        );

        var technologiesIcons = this.props.project.technologies.map(function (technology, index) {
            return <div
                key={technology}
                className={"opacity-75 text-lg inline-block m-1 fonticon icon-" + sanitizeTechnology(technology)}
                title={technology}>
                <span>{technology}</span>
            </div>;
        });

        return (
            <div
                className={classes}
                data-aos='fade-up' data-aos-delay={200 + (this.props.index * 100)}
            >
                {/* TODO : it seems that next prefetch (activated only in prod) don't prefetch the pictures... */}
                <Link href="/project/[project]" as={`/project/${this.props.project.title}`}>
                    <a>

                        {/* Project title and subtitle */}
                        <div className="px-6 py-4">
                            <div className="text-xl font-bold uppercase">{this.props.project.title}</div>
                            <p className="text-xs text-gray-400">{this.props.project.category}</p>
                        </div>

                        {/* Project technologies list */}
                        <div className="absolute bottom-0 px-6 py-4">
                            {technologiesIcons}
                        </div>

                        {/* Project preview image */}
                        <div className={styles.preview}></div>

                    </a>
                </Link>
            </div>
        );
    }
}