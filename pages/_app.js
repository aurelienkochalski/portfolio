// Loading classNames library and make it available globally
import classNames from "classnames";
global.classNames = classNames;

// Loading global styles
import "../styles/global.scss";

// Loading AnimateOnScroll library and styles
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react"; // To use an effect hook without transforming the component into a class

export default function App({ Component, pageProps, router }) {

    // Similar to componentDidMount & componentDidUpdate
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease",
            mirror: true // whether elements should animate out while scrolling past them (doesn't seems to work...)
        });
    });

    return (
        <Component {...pageProps} />
    );

}
