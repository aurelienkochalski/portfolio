import styles from "./projectView.module.scss";

import Link from "next/link";

export default class ProjectView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const gallery = this.props.gallery.map(function (media, index) {

            let mediaClasses = classNames(
                "w-full",
                media.match(/-sm/g) ? "col-span-1" : "col-span-2" // We give less col-span to medias that needs to be rendered a little smaller
            );

            // Remove the special -sm, we won't need it anymore
            media = media.replace("-sm", "");

            // We return a different element depending on the media type
            let element;
            if (media.match(/jpg|png/g)) { // Images
                element = <img
                    key={media}
                    className={mediaClasses}
                    src={"/images/project/" + media}
                />;
            }
            else if (media.match(/mp4/g)) { // Videos

                // We build the poster uri base on the media name  (the poster has the same name with a "-preview" suffix but it's in the /images folder with jpg extension)
                const poster = "/images/project/" + media.replace(".mp4", "-preview.jpg");

                element = <video
                    key={media}
                    className={mediaClasses}
                    poster={poster}
                    muted autoPlay loop="loop">
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
                    "flex flex-col w-full p-8 md:fixed md:h-screen md:w-400"
                )}>

                    <div className="flex flex-row">
                        <Link href="/" scroll={false}>{/* `scroll` set to false allows us to restore the scroll position when returning to the homepage */}
                            <a className="pr-6 text-4xl">←</a>
                        </Link>
                        <div>
                            <h1 className="text-lg font-bold uppercase">{this.props.title}</h1>
                            <h2 className="text-sm text-gray-400">{this.props.category}</h2>
                        </div>
                    </div>

                    <p className="py-8 text-justify whitespace-pre-line">{this.props.description}</p>

                    <div className="md:mt-auto">
                        <p className="pb-4 text-sm"><b>Technologies: </b>{this.props.technologies}</p>
                        {this.props.authors ?
                            <p className="pb-4 text-sm"><b>Collaboration: </b>{this.props.authors}</p> : null
                        }
                    </div>
                </div>

                <div className="md:w-full md:ml-400 xl:w-800">
                    <div className="p-8 grid grid-cols-2 gap-8">
                        {gallery}
                    </div>
                </div>

            </div>
        );
    }
}