import { Form } from "react-bootstrap"
import { InputType } from "../data/enums/InputType"
import csrf from "../hooks/csrf"

export default function Csrf(): JSX.Element
{
    return <Form.Control type={InputType.HIDDEN} name={"_csrf_token"} value={csrf()} />
}