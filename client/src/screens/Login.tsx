import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import Page from "../components/Page"
import Title from "../components/Title"
import { Route } from "../data/enums/Route"
import { String } from "../data/enums/String"
import "../assets/sass/Auth.sass"

export default function Login(): JSX.Element
{
    const [ username, setUsername ] = useState<string>(String.EMPTY)
    const [ password, setPassword ] = useState<string>(String.EMPTY)

    return <Page>
        <Title />
        <Row>
            <Col xxl={{ span: 6, offset: 3 }}>
                <Form className="auth-container">
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
                                <Form.Control type="text" placeholder="User" value={username} onInput={event => setUsername(event.currentTarget.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{ span: 6, offset: 3 }}>
                            <Form.Group className="auth-form">
                                <Form.Label>Hasło:</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onInput={event => setPassword(event.currentTarget.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{ span: 4, offset: 4 }}>
                            <Form.Group className="auth-form d-flex justify-content-center">
                                <Button variant="primary" type="submit" className="w-100">Zaloguj się</Button>
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