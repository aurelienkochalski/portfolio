import styles from "./resume.module.scss";

export default function ResumeItem(props) {

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

            <em className="block mb-1 text-sm not-italic text-normal">{props.children}</em>

            {props.progression &&
                <ResumeProgress progression={props.progression}/>
            }

            {props.description &&
                <p className="block mt-4 text-xs whitespace-pre-line">{props.description}</p>
            }

        </div>
    );
}

// NOTE : this is a named export
export const ResumeProgress = (props) => {

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
};