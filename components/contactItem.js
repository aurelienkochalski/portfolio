const animationDelayBeforeStarting = 200;
const animationStaggering = 50;

export default function ContactItem(props) {

    var classes = classNames(
        "inline-block mb-6 mr-6 text-lg text-left align-text-top whitespace-pre-line"
    );

    return (
        <a href={props.link}
            className={classes}
            data-aos='fade-up'
            data-aos-delay={animationDelayBeforeStarting + (props.index * animationStaggering)}
        >
            {props.icon && <span style={{ top: "-2px" }} className={"relative mr-2 sm:mr-4 text-2xl align-middle fonticon icon-" + props.icon}></span>}
            {props.text}
        </a>
    );
}