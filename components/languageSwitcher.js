import styles from "./languageSwitcher.module.scss";

export default class LanguageSwitcher extends React.Component {

    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            activeLanguage: this.props.defaultLanguage
        };

        // Events binding
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    handleLanguageChange(language) {

        // If it's not already the current language
        if (language != this.state.activeLanguage){

            this.setState({
                activeLanguage: language
            });

            // We call the parent handler
            this.props.onLanguageChange(language);
        }
    }

    render() {
        var languagesList = this.props.languages.map((language, index, arr) => {
            return (
                <React.Fragment key={language}>
                    <LanguageItem
                        language={language}
                        activeLanguage={this.state.activeLanguage}
                        onLanguageChange={this.handleLanguageChange}
                    />

                    {/* We won't need a separator if it's the last item */}
                    {index !== arr.length - 1 && <LanguageSeparator symbol="/"/>}
                </React.Fragment>
            );
        });

        return (
            <div className={styles.container}>
                {languagesList}
            </div>
        );
    }
}

export class LanguageItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var classes = classNames(
            styles.link,
            "p-1 text-lg uppercase cursor-pointer",
            (this.props.language === this.props.activeLanguage ? styles.linkActive : null)
        );

        return (
            <button
                key={this.props.language}
                onClick={() => this.props.onLanguageChange(this.props.language)}
                className={classes}>
                {this.props.language}
            </button>
        );
    }
}

export const LanguageSeparator = (props) => {

    const classes = classNames(
        styles.separator,
        "text-lg px-1"
    );

    return (
        <span className={classes}>{props.symbol}</span>
    );
};