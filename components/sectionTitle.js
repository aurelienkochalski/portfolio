import styles from "./sectionTitle.module.scss";

export default function SectionTitle(props) {

    var classes = classNames(
        styles.title,
        "block py-6 uppercase font-title tracking-widest"
    );

    return (
        <span className={classes}>
            [{props.text}]
        </span>
    );
}
