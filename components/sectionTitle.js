import styles from "./sectionTitle.module.scss";

import { CSSTransition, TransitionGroup } from "react-transition-group";
const animationDelayBeforeStarting = 200;
const animationStaggering = 200;

export default function SectionTitle(props) {

    var classes = classNames(
        styles.title,
        "block py-12 uppercase font-title tracking-widest text-2xl"
    );

    return (
        <TransitionGroup>
            <CSSTransition in={true} key={props.text} timeout={0 + props.index * 50}>

                <span
                    className={classes}
                    data-aos='fade-right' data-aos-delay="0"
                >
            [{props.text}]
                </span>

            </CSSTransition>
        </TransitionGroup>
    );
}
