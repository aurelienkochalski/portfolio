import styles from "./projectCard.module.scss";

import Link from "next/link";

export default class ProjectCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        var classes = classNames(
            styles.card,
            "max-w-sm"
        );

        return (
            <div
                className={classes}
                data-aos='fade-up' data-aos-delay={200 + (this.props.index * 100)}
            >
                {/* TODO : it seems that next prefetch (activated only in prod) don't prefetch the pictures... */}
                <Link href="#">
                    <a>

                        {/* Project title and subtitle */}
                        <div className="px-6 py-4">
                            <div className="text-xl font-bold uppercase">{this.props.project.title}</div>
                            <p className="text-xs text-gray-400">{this.props.project.category}</p>
                        </div>

                        {/* Project technologies list */}
                        <div className="absolute bottom-0 px-6 py-4">
                            {this.props.project.technologies}
                        </div>

                        {/* Project preview image */}
                        <div className={styles.preview}></div>

                    </a>
                </Link>
            </div>
        );
    }
}