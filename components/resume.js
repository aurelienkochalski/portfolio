import styles from "./resume.module.scss";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const animationDelayBeforeStarting = 0;
const animationStaggering = 40;

export function ResumeColumn(props) {

    var classes = classNames(
        "w-full mr-8",
        "md:w-1/" + props.columns
    );
    return (
        <div
            className={classes}
            data-aos='fade-up' data-aos-delay={animationDelayBeforeStarting + (0 * animationStaggering)}
        >
            {props.children}
        </div>
    );
}

export function ResumeBlock(props) {

    const skillElements = props.elements.map(function (skillElement, index) {
        return (
            <ResumeItem
                key={index}
                title={skillElement.title}
                description={skillElement.description}
                progression={skillElement.progression}>
                {skillElement.text}
            </ResumeItem>
        );
    });

    return (
        <>
            <h5 className="mb-5 font-bold uppercase">{props.title}</h5>
            {skillElements}
        </>
    );
}

export function ResumeItem(props) {

    var classes = classNames(
        styles.resumeItem,
        "m-t1",
        (props.title != undefined ? "mb-8" : "mb-2") // If the title is set, we add more margin
    );

    return (
        <div className={classes}>
            {props.title &&
                <b className="block mb-1 text-sm">{props.title}</b>
            }

            <TransitionGroup>
                <CSSTransition
                    key={props.children}
                    timeout={animationDelayBeforeStarting + props.index * animationStaggering}
                >
                    <em className="block mb-1 text-sm not-italic text-normal">{props.children}</em>
                </CSSTransition >
            </TransitionGroup>

            {props.progression &&
                <ResumeProgress progression={props.progression}/>
            }

            {props.description &&
                <p className="block mt-4 text-xs whitespace-pre-line">{props.description}</p>
            }

        </div>
    );
}

export function ResumeProgress(props) {

    var classesProgress = classNames(
        styles.progress,
        "block mt-1 mb-3"
    );
    var classesProgression = classNames(
        styles.progression,
        "block relative h-full"
    );

    return (
        <div className={classesProgress}>
            <span
                className={classesProgression}
                style={{ width: props.progression + "%" }}
            ></span>
        </div>
    );
}

// Props validation
import PropTypes from "prop-types";

ResumeColumn.propTypes = {
    columns: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired
};

ResumeBlock.propTypes = {
    title: PropTypes.string.isRequired,
    elements: PropTypes.array.isRequired
};

ResumeItem.propTypes = {
    index: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    progression: PropTypes.number,
    children: PropTypes.node.isRequired
};

ResumeProgress.propTypes = {
    progression: PropTypes.number
};