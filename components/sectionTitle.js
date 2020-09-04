import styles from "./sectionTitle.module.scss";

export default function SectionTitle(props) {

    var classes = classNames(
        styles.title,
        "block py-12 uppercase font-title tracking-widest"
    );

    return (
        <span
            className={classes}
            data-aos='fade-right' data-aos-delay="0"
        >
            [{props.text}]
        </span>
    );
}
