import { useState, useCallback, FormEvent } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import Page from "../components/Page"
import Title from "../components/Title"
import GeneralError from "../components/GeneralError"
import Api from "../helpers/Api"
import PageHelper from "../helpers/PageHelper"
import createErrorMessage from "../hooks/createErrorMessage"
import { LoginRequestData } from "../../../@types/request/LoginRequestData"
import { LoginResponseData } from "../../../@types/response/LoginResponseData"
import { Route } from "../data/enums/Route"
import { HttpType } from "../data/enums/HttpType"
import { InputType } from "../data/enums/InputType"
import { ButtonType } from "../data/enums/ButtonType"
import EmptyDep from "../data/constans/EmptyDep"
import "../assets/sass/Auth.sass"


export enum LoginForm
{
    USERNAME = "username",
    PASSWORD = "password"
}

export default function Login(): JSX.Element
{
    const [ validated, setValidated ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState<JSX.Element | null>(null)

    const submitLogin = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        Api.post<LoginRequestData, LoginResponseData>(Route.LOGIN)
            .on("response", handleResponse)
            .on("error", handleError)
            .form(data)
            .send()
    }, EmptyDep)


    const handleResponse = useCallback((response: LoginResponseData) => {
        if (response.success) {
            setValidated(true)
            PageHelper.goTo(Route.HOME)
        }
        else {
            setErrorMessage(<GeneralError />)
        }
    }, EmptyDep)

    const handleError = useCallback((data: LoginResponseData | string) => {
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


    return <Page errorMessage={errorMessage}>
        <Title />
        <Row>
            <Col xxl={{ span: 6, offset: 3 }}>
                <Form method={HttpType.POST} className="auth-container" validated={validated} onSubmit={submitLogin}>
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
                                    placeholder="User" />
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
                                    placeholder="Password" />
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