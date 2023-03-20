export default function createErrorMessage(message: string, ...sections: Array<JSX.Element>): JSX.Element
{
    return <div className="d-flex flex-column">
        <span className="error-message">{ message }</span>
        { sections }
    </div>
}