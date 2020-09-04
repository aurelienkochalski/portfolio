import styles from "./projectCard.module.scss";

import Link from "next/link";
import { sanitizeTechnology } from "../utils/tools";

const animationDelayBeforeStarting = 200;
const animationStaggering = 50;

export default class ProjectCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        var technologiesIcons = this.props.project.technologies.map(function (technology, index) {
            return <div
                key={technology}
                className={"opacity-75 text-lg inline-block m-1 fonticon icon-" + sanitizeTechnology(technology)}
                data-tip={technology}
            >
                <span>{technology}</span>
            </div>;
        });

        return (
            <div
                className={classNames(
                    styles.card,
                    "max-w-sm"
                )}
                data-aos='fade-up' data-aos-delay={animationDelayBeforeStarting + (this.props.index * animationStaggering)}
            >
                {/* TODO : it seems that next prefetch (activated only in prod) don't prefetch the pictures... */}
                <Link href="/project/[project]" as={`/project/${this.props.project.slug}`}>
                    <a>

                        {/* Project title and subtitle */}
                        <div className="px-6 py-5">
                            <div className="text-lg font-bold uppercase">{this.props.project.title}</div>
                            <p className="text-sm text-gray-400">{this.props.project.category}</p>
                        </div>

                        {/* Project technologies list */}
                        <div className="absolute bottom-0 px-6 py-4">
                            {technologiesIcons}
                        </div>

                        {/* Project preview image */}
                        <div
                            className={classNames(
                                styles.preview,
                                "absolute overflow-hidden w-full h-full top-0 left-0"
                            )}
                            style={{ backgroundImage: "url(/images/project/" + this.props.project.preview + ")" }}
                        ></div>

                    </a>
                </Link>
            </div>
        );
    }
}