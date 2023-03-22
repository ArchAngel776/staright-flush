import { useState, useCallback, useReducer, FormEvent } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import Page from "../components/Page"
import Title from "../components/Title"
import Csrf from "../components/Csrf"
import GeneralError from "../components/GeneralError"
import Api from "../helpers/Api"
import PageHelper from "../helpers/PageHelper"
import loginErrorsReducer, { LoginErrorsActionType } from "../reducers/loginErrorsReducer"
import createErrorMessage from "../hooks/createErrorMessage"
import hasErrors from "../hooks/hasErrors"
import { LoginRequestData } from "../../../@types/request/LoginRequestData"
import { LoginResponseData } from "../../../@types/response/LoginResponseData"
import { Route } from "../data/enums/Route"
import { HttpType } from "../data/enums/HttpType"
import { InputType } from "../data/enums/InputType"
import { ButtonType } from "../data/enums/ButtonType"
import EmptyDep from "../data/constans/EmptyDep"
import { RequestErrors } from "../data/types/RequestErrors"
import FormErrors from "../components/FormErrors"
import "../assets/sass/Auth.sass"


export enum LoginForm
{
    USERNAME = "username",
    PASSWORD = "password",
    REMEMBER = "remember"
}

export default function Login(): JSX.Element
{
    const [ validated, setValidated ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState<JSX.Element | null>(null)
    const [ errors, dispatchErrors ] = useReducer(loginErrorsReducer, {})

    const submitLogin = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        Api.post<LoginRequestData, LoginResponseData>(Route.LOGIN)
            .on("response", handleResponse)
            .on("validateError", handleValidateError)
            .on("error", handleError)
            .form(data)
            .send()
    }, EmptyDep)


    const handleResponse = useCallback((response: LoginResponseData) => {
        dispatchErrors({
            type: LoginErrorsActionType.RESET
        })

        if (response.success) {
            setValidated(true)
            PageHelper.goTo(Route.HOME)
        }
        else {
            setErrorMessage(<GeneralError />)
        }
    }, EmptyDep)

    const handleValidateError = useCallback((errors: RequestErrors<LoginRequestData>) => {
        dispatchErrors({
            type: LoginErrorsActionType.SET,
            errors
        })
    }, EmptyDep)

    const handleError = useCallback((data: LoginResponseData | string) => {
        dispatchErrors({
            type: LoginErrorsActionType.RESET
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


    const clearErrors = useCallback((property: keyof LoginRequestData) => () => {
        dispatchErrors({
            type: LoginErrorsActionType.CLEAR,
            property
        })
    }, EmptyDep)

    return <Page errorMessage={errorMessage}>
        <Title />
        <Row>
            <Col xxl={{ span: 6, offset: 3 }}>
                <Form method={HttpType.POST} className="auth-container" validated={validated} onSubmit={submitLogin}>
                    <Csrf />
                    <Row>
                        <Col xs={12} md={{ span: 10, offset: 1 }}>
                            <Form.Group className="auth-form">
                                <h1 className="auth-title">Logowanie</h1>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{ span: 6, offset: 3 }}>
                            <Form.Group className="auth-form">
                                <Form.Label>Nazwa użytkownika:</Form.Label>
                                <Form.Control
                                    type={InputType.TEXT}
                                    name={LoginForm.USERNAME}
                                    isInvalid={hasErrors(errors.username)}
                                    placeholder="User"
                                    onInput={clearErrors(LoginForm.USERNAME)} />
                                <FormErrors errors={errors.username} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{ span: 6, offset: 3 }}>
                            <Form.Group className="auth-form">
                                <Form.Label>Hasło:</Form.Label>
                                <Form.Control
                                    type={InputType.PASSWORD}
                                    name={LoginForm.PASSWORD}
                                    isInvalid={hasErrors(errors.password)}
                                    placeholder="Password"
                                    onInput={clearErrors(LoginForm.PASSWORD)} />
                                <FormErrors errors={errors.password} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{ span: 6, offset: 3 }}>
                            <Form.Group className="auth-form" controlId={LoginForm.REMEMBER}>
                                <Form.Check type={InputType.CHECKBOX} className="text-center">
                                    <Form.Check.Input
                                        name={LoginForm.REMEMBER}
                                        className="auth-checkbox"
                                        isInvalid={hasErrors(errors.remember)}
                                        onClick={clearErrors(LoginForm.REMEMBER)} />
                                    <Form.Check.Label>Zapamiętaj mnie</Form.Check.Label>
                                    <FormErrors errors={errors.remember} />
                                </Form.Check>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{ span: 4, offset: 4 }}>
                            <Form.Group className="auth-form d-flex justify-content-center">
                                <Button variant="primary" type={ButtonType.SUBMIT} className="w-100">Zaloguj się</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form.Group className="auth-form d-flex justify-content-center">
                                <a href={Route.REGISTER} className="auth-anchor">Nie masz konta? Zarejestruj się!</a>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    </Page>
}