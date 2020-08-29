import styles from "./projectView.module.scss";

export default class ProjectView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const gallery = this.props.gallery.map(function (media, index) {

            let classes = "w-full ";
            let element;

            // We add a class to medias that needs to be rendered a little smaller
            if (media.match(/-sm/g)) {
                classes += styles.small;
            }

            // We return a different element depending on the media type
            if (media.match(/jpg|png/g)) { // Images
                element = <img
                    key={media}
                    className={classes}
                    src={"/images/" + media}
                />;
            }
            else if (media.match(/mp4/g)) { // Videos
                // TODO : add the attribute poster="TODO.jpg"
                element = <video key={media} className={classes} muted autoPlay loop="loop">
                    <source src={"/videos/" + media} type="video/mp4"/>
                </video>;
            }

            return element;
        });

        return (
            <div className={classNames(
                styles.container,
                "flex flex-col md:flex-row"
            )}>
                <div className={classNames(
                    styles.sidebar,
                    "w-full p-8 md:h-full md:w-1/3"
                )}>
                    <h1>{this.props.title}</h1>
                    <h2>{this.props.category}</h2>
                    <p>{this.props.description}</p>
                    <em>Technologies : {this.props.technologies}</em>
                </div>

                <div className="md:w-2/3">
                    <div className={styles.masonry}>
                        {gallery}
                    </div>
                </div>

            </div>
        );
    }
}