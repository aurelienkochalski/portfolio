const animationDelayBeforeStarting = 0;
const animationStaggering = 50;

export default function ContactItem(props) {

    var classes = classNames(
        "inline-block mb-6 mr-6 text-lg text-left align-text-top whitespace-pre-line break-all"
    );

    return (
        <>
        {props.link ? 
            // Render a link if href is set
            <a href={props.link}
                target="_blank"
                rel="noreferrer noopener"
                className={classes}
                data-aos='fade-up'
                data-aos-delay={animationDelayBeforeStarting + (props.index * animationStaggering)}
            >
                {props.icon && <span style={{ top: "-2px" }} className={"relative mr-2 sm:mr-4 text-2xl align-middle fonticon icon-" + props.icon}></span>}
                {props.text}
            </a>
            : 
            // Render a span if href is not set
            <span 
                className={classes}
                data-aos='fade-up'
                data-aos-delay={animationDelayBeforeStarting + (props.index * animationStaggering)}
            >
                {props.icon && <span style={{ top: "-2px" }} className={"relative mr-2 sm:mr-4 text-2xl align-middle fonticon icon-" + props.icon}></span>}
                {props.text}
            </span>
        }
        </>
    );
}