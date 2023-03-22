import { useState, useEffect, useCallback } from "react"
import { Row, Col, Image, Button, ListGroup } from "react-bootstrap"

import Page from "../components/Page"
import Title from "../components/Title"
import GeneralError from "../components/GeneralError"
import Api from "../helpers/Api"
import PageHelper from "../helpers/PageHelper"

import csrf from "../hooks/csrf"
import createErrorMessage from "../hooks/createErrorMessage"

import { LogoutRequestData } from "../../../@types/request/LogoutRequestData"
import { LogoutResponseData } from "../../../@types/response/LogoutResponseData"
import EmptyDep from "../data/constans/EmptyDep"
import { ButtonType } from "../data/enums/ButtonType"
import { Route } from "../data/enums/Route"
import { WithCsrf } from "../data/types/WithCsrf"
import User from "../helpers/User"
import UserInterface from "../../../@types/UserInterface"


export default function Home(): JSX.Element
{
    const [ user, setUser ] = useState<UserInterface>()
    const [ errorMessage, setErrorMessage ] = useState<JSX.Element | null>(null)

    useEffect(() => {
        User.load().then(() => setUser(User.me))
    })

    const handleLogout = useCallback(() => {
        const _csrf_token = csrf()
        if (!_csrf_token) {
            return
        }

        Api.post<WithCsrf<LogoutRequestData>, LogoutResponseData>(Route.LOGOUT)
            .on("response", handleResponse)
            .on("error", handleError)
            .json({ _csrf_token })
            .send()
    }, EmptyDep)


    const handleResponse = useCallback((response: LogoutResponseData) => {
        response.success ?
            PageHelper.goTo(Route.LOGIN) :
            setErrorMessage(<GeneralError />)
    }, EmptyDep)

    const handleError = useCallback((data: LogoutResponseData | string) => {
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
        {
            user ?
            <Row>
                <Col xxl={{ offset: 4, span: 4 }}>
                    <Row>
                        <Col xxl={6}>
                            <Image src={user.avatar} fluid rounded alt="avatar" />
                        </Col>
                        <Col xxl={6}>
                            <ListGroup>
                                <ListGroup.Item>Użytkownik: { user.username }</ListGroup.Item>
                                <ListGroup.Item>Email: { user.email }</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </Col>
            </Row> : null
        }
        <Row>
            <Col xxl={{ offset: 5, span: 2 }}>
                <Button variant="danger" type={ButtonType.BUTTON} className="w-100" onClick={handleLogout}>Wyloguj</Button>
            </Col>
        </Row>
    </Page>
}