export default function AboutItem(props) {
    return (
        <p
            className="py-2"
            dangerouslySetInnerHTML={{ __html: props.text }} // NOTE : We can purposely use this to render links in content because the data is coming from a trusted local database which runs only at build time.
        >
        </p>
    );
}