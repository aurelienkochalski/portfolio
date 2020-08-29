import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const animationDelayBeforeStarting = 200;
const animationStaggering = 50;

export default function ContactItem(props) {

    var classes = classNames(
        "inline-block mb-6 mr-6 text-sm text-right align-text-top whitespace-pre-line"
    );

    return (
        <a href={props.link}
            className={classes}
            data-aos='fade-up'
            data-aos-delay={animationDelayBeforeStarting + (props.index * animationStaggering)}
        >
            {props.icon && <FontAwesomeIcon icon={props.icon} className="icon" />}
            {props.text}
        </a>
    );
}