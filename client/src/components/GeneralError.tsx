import DefaultError from "../data/constans/DefaultError"
import createErrorMessage from "../hooks/createErrorMessage"

export default function GeneralError(): JSX.Element
{
    const email = "karol.marciniak155@gmail.com"

    return createErrorMessage(DefaultError, <div className="error-support-section">
        <span className="error-support-label">Email:</span>
        <a href={`mailto:${email}`} className="error-support-email">{ email }</a>
    </div>)
}