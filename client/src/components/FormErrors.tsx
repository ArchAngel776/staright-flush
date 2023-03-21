import { Form } from "react-bootstrap"
import getErrors from "../hooks/getErrors"

export interface FormErrorsProps
{
    errors: Array<string> | undefined
}

export default function FormErrors({ errors }: FormErrorsProps): JSX.Element
{
    return <>{ getErrors(errors).map((error, index) => <Form.Control.Feedback key={index} type="invalid" className="text-center">{ error }</Form.Control.Feedback>) }</>
}