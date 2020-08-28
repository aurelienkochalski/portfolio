// Loading classNames library and make it available globally
import classNames from "classnames";
global.classNames = classNames;

// Loading global styles
import "../styles/global.scss";

export default function App({ Component, pageProps, router }) {

    return (
        <Component {...pageProps} />
    );

}
