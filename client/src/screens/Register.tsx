import { useState, FormEvent, useCallback, useReducer } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import Page from "../components/Page"
import Title from "../components/Title"
import FormErrors from "../components/FormErrors"
import GeneralError from "../components/GeneralError"
import Api from "../helpers/Api"
import registerErrorsReducer, { RegisterErrorsActionType } from "../reducers/registerErrorsReducer"
import hasErrors from "../hooks/hasErrors"
import csrf from "../hooks/csrf"
import createErrorMessage from "../hooks/createErrorMessage"
import { RegisterRequestData } from "../../../@types/request/RegisterRequestData"
import { RegisterRequestFiles } from "../../../@types/request/files/RegisterRequestFiles"
import { RegisterResponseData } from "../../../@types/response/RegisterResponseData"
import { Route } from "../data/enums/Route"
import { HttpType } from "../data/enums/HttpType"
import { InputType } from "../data/enums/InputType"
import { ButtonType } from "../data/enums/ButtonType"
import { RequestErrors } from "../data/types/RequestErrors"
import EmptyDep from "../data/constans/EmptyDep"
import "../assets/sass/Auth.sass"
import Csrf from "../components/Csrf"

export enum RegisterForm
{
    USERNAME            = "username",
    EMAIL               = "email",
    PASSWORD            = "password",
    CONFIRM_PASSWORD    = "confirmPassword",
    AVATAR              = "avatar",
    ACCEPT_TERMS        = "acceptTerms"
}

export default function Register(): JSX.Element
{
    const [ validated, setValidated ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState<JSX.Element | null>(null)
    const [ errors, dispatchErrors ] = useReducer(registerErrorsReducer, {})

    const submitRegister = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        Api.post<RegisterRequestData, RegisterResponseData>(Route.REGISTER)
            .on("response", handleResponse)
            .on("validateError", handleValidateError)
            .on("error", handleError)
            .form(data)
            .send()
    }, EmptyDep)


    const handleResponse = useCallback((response: RegisterResponseData) => {
        dispatchErrors({
            type: RegisterErrorsActionType.RESET
        })
        setValidated(true)

        console.log(response)
    }, EmptyDep)

    const handleValidateError = useCallback((errors: RequestErrors<RegisterRequestData>) => {
        dispatchErrors({
            type: RegisterErrorsActionType.SET,
            errors
        })
    }, EmptyDep)

    const handleError = useCallback((data: RegisterResponseData | string) => {
        dispatchErrors({
            type: RegisterErrorsActionType.RESET
        })

        if (typeof data === "string") {
            setErrorMessage(<GeneralError />)
        }
        else if (!data.success && data.message) {
            setErrorMessage(createErrorMessage(data.message))
        }
        else {
            setErrorMessage(null)
        }
    }, EmptyDep)


    const clearErrors = useCallback((property: keyof RegisterRequestData | keyof RegisterRequestFiles) => () => {
        dispatchErrors({
            type: RegisterErrorsActionType.CLEAR,
            property
        })
    }, EmptyDep)

    return <Page errorMessage={errorMessage}>
        <Title />
        <Row>
            <Col xxl={{ span: 6, offset: 3 }}>
                <Form method={HttpType.POST} className="auth-container" validated={validated} onSubmit={submitRegister}>
                    <Csrf />
                    <Row>
                        <Col xs={12} md={{ span: 10, offset: 1 }}>
                            <Form.Group className="auth-form">
                                <h1 className="auth-title">Rejestracja</h1>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{ span: 6, offset: 3 }}>
                            <Form.Group className="auth-form" controlId={RegisterForm.USERNAME}>
                                <Form.Label>Nazwa użytkownika:</Form.Label>
                                <Form.Control
                                    type={InputType.TEXT}
                                    name={RegisterForm.USERNAME}
                                    isInvalid={hasErrors(errors.username)}
                                    placeholder="User"
                                    onInput={clearErrors(RegisterForm.USERNAME)} />
                                <FormErrors errors={errors.username} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{ span: 6, offset: 3 }}>
                            <Form.Group className="auth-form" controlId={RegisterForm.EMAIL}>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type={InputType.EMAIL}
                                    name={RegisterForm.EMAIL}
                                    isInvalid={hasErrors(errors.email)}
                                    placeholder="john@email.com"
                                    onInput={clearErrors(RegisterForm.EMAIL)} />
                                <FormErrors errors={errors.email} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{ span: 6, offset: 3 }}>
                            <Form.Group className="auth-form" controlId={RegisterForm.PASSWORD}>
                                <Form.Label>Hasło:</Form.Label>
                                <Form.Control
                                    type={InputType.PASSWORD}
                                    name={RegisterForm.PASSWORD}
                                    isInvalid={hasErrors(errors.password)}
                                    placeholder="Password"
                                    onInput={clearErrors(RegisterForm.PASSWORD)} />
                                <FormErrors errors={errors.password} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{ span: 6, offset: 3 }}>
                            <Form.Group className="auth-form" controlId={RegisterForm.CONFIRM_PASSWORD}>
                                <Form.Label>Powtórz hasło:</Form.Label>
                                <Form.Control
                                    type={InputType.PASSWORD}
                                    name={RegisterForm.CONFIRM_PASSWORD}
                                    isInvalid={hasErrors(errors.confirmPassword)}
                                    placeholder="Confirm password"
                                    onInput={clearErrors(RegisterForm.CONFIRM_PASSWORD)} />
                                <FormErrors errors={errors.confirmPassword} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{ span: 6, offset: 3 }}>
                            <Form.Group className="auth-form" controlId={RegisterForm.AVATAR}>
                                <Form.Label>Avatar:</Form.Label>
                                <Form.Control
                                    type={InputType.FILE}
                                    name={RegisterForm.AVATAR}
                                    isInvalid={hasErrors(errors.avatar)}
                                    onClick={clearErrors(RegisterForm.AVATAR)} />
                                <FormErrors errors={errors.avatar} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{ span: 6, offset: 3 }}>
                            <Form.Group className="auth-form" controlId={RegisterForm.ACCEPT_TERMS}>
                                <Form.Check type={InputType.CHECKBOX} className="text-center">
                                    <Form.Check.Input
                                        name={RegisterForm.ACCEPT_TERMS}
                                        className="auth-checkbox"
                                        isInvalid={hasErrors(errors.acceptTerms)}
                                        onClick={clearErrors(RegisterForm.ACCEPT_TERMS)} />
                                    <Form.Check.Label>Akceptuję regulamin</Form.Check.Label>
                                    <FormErrors errors={errors.acceptTerms} />
                                </Form.Check>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{ span: 6, offset: 3 }}>
                            <Form.Group className="auth-form d-flex justify-content-center">
                                <Button variant="primary" type={ButtonType.SUBMIT} className="w-100">Rejestracja</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form.Group className="auth-form d-flex justify-content-center">
                                <a href={Route.LOGIN} className="auth-anchor">Masz już konto? Zaloguj się!</a>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    </Page>
}