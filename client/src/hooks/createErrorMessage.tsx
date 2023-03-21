import ErrorSection from "../data/callbacks/ErrorSection"

export default function createErrorMessage(message: string, ...sections: Array<ErrorSection>): JSX.Element
{
    return <div className="d-flex flex-column">
        <span className="error-message">{ message }</span>
        { sections.map((Section, index) => <Section key={index} index={index} />) }
    </div>
}