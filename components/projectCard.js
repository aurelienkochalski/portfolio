import React from "react";
import styles from "./projectCard.module.scss";

import Link from "next/link";
import Image from "next/image";
import { sanitizeTechnology } from "../utils/tools";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const animationDelayBeforeStarting = 0;
const animationStaggering = 50;

export default class ProjectCard extends React.Component {
    constructor(props) {
        super(props);

        this.projectCategory =
            "category-" + sanitizeTechnology(this.props.project.category); // We set this on the constructor, to not retrigger it on language change and prevent className replacement (that would erase the aniamted classe)
    }

    render() {
        var technologiesIcons = this.props.project.technologies.map(function (
            technology,
            index
        ) {
            return (
                <div
                    key={technology}
                    className={classNames(
                        "opacity-75 text-lg inline-block m-1",
                        "fonticon icon-" + sanitizeTechnology(technology),
                        styles.icon
                    )}
                    data-tip={technology}
                >
                    <span>{technology}</span>
                </div>
            );
        });

        return (
            <div
                className={classNames(
                    styles.card,
                    "mx-auto h-full w-full",
                    this.projectCategory
                )}
                data-aos="fade-up"
                data-aos-delay={
                    animationDelayBeforeStarting +
                    this.props.index * animationStaggering
                }
            >
                <div className="relative flex flex-col h-full overflow-hidden">
                    {/* TODO : it seems that next prefetch (activated only in prod) don't prefetch the pictures... */}
                    <Link
                        className="flex-auto px-6 py-5"
                        href="/project/[project]"
                        as={`/project/${this.props.project.slug}`}
                    >
                        {/* Project title and subtitle */}
                        <div className="">
                            <TransitionGroup>
                                <CSSTransition
                                    in={true}
                                    key={this.props.project.title}
                                    timeout={0 + this.props.index * 50}
                                >
                                    <div className="text-lg font-bold uppercase">
                                        {this.props.project.title}
                                    </div>
                                </CSSTransition>
                                <CSSTransition
                                    in={true}
                                    key={this.props.project.category}
                                    timeout={100 + this.props.index * 50}
                                >
                                    <p className="text-sm text-gray-400">
                                        {this.props.project.category}
                                    </p>
                                </CSSTransition>
                            </TransitionGroup>
                        </div>
                    </Link>

                    {/* Project technologies list */}
                    <div className="flex-none px-5 pb-4">
                        {technologiesIcons}
                    </div>

                    {/* Project preview image */}
                    <div
                        className={classNames(
                            styles.preview,
                            "absolute overflow-hidden w-full h-full top-0 left-0"
                        )}
                    >
                        <Image
                            src={"/images/projects/" + this.props.project.preview}
                            alt={this.props.project.title}
                            width="400"
                            height="533"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
