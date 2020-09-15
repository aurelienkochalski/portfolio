import styles from "./resume.module.scss";

const animationDelayBeforeStarting = 0;
const animationStaggering = 50;

export function ResumeColumn(props) {

    var classes = classNames(
        "flex-initial w-full md:mr-24 lg:mr-32 md:last:mr-0 mb-40 sm:mb-0 last:mb-0",
        "md:w-" + props.size
    );
    return (
        <div
            key={props.index}
            className={classes}
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

    // If the first elements contains a progression, the wrapper could render in multiple columns
    let skillsWrapper;
    if (skillElements[0].props.progression) {
        skillsWrapper = <div className="items-end grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-12 md:gap-x-0">{skillElements}</div>;
    } else {
        skillsWrapper = <div>{skillElements}</div>;
    }

    return (
        <div
            className="mt-4 mb-40 sm:mb-24 last:mb-4"
            data-aos='fade-up' data-aos-delay={animationDelayBeforeStarting + (props.index * animationStaggering)}
        >
            <h5 className="inline-block pb-3 mb-2 text-xl font-bold text-left uppercase border-b border-white border-solid border-opacity-25">{props.title}</h5>
            {skillsWrapper}
        </div>
    );
}

export function ResumeItem(props) {

    var classes = classNames(
        styles.resumeItem,
        "md:mx-2 mx-0 mt-4",
        (props.title != undefined ? "mb-12" : "mb-0") // If the title is set, we add more margin
    );

    return (
        <div className={classes}>
            {props.title &&
                <b className={classNames(
                    "inline-block mb-1 text-lg",
                    styles.title
                )}>{props.title}</b>
            }

            <em className="block mb-1 text-base not-italic text-normal">{props.children}</em>

            {props.progression &&
                <ResumeProgress progression={props.progression}/>
            }

            {props.description &&
                <p className="block mt-1 text-sm whitespace-pre-line">{props.description}</p>
            }

        </div>
    );
}

export function ResumeProgress(props) {

    var classesProgress = classNames(
        styles.progress,
        "block mt-1 mb-1"
    );
    var classesProgression = classNames(
        styles.progression,
        "block relative h-full"
    );

    return (
        <div
            className={classesProgress}
            title={props.progression + "%"}
        >
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
    size: PropTypes.string,
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