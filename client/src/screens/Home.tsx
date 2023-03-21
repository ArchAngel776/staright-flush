import { useState, useCallback } from "react"
import { Row, Col, Button } from "react-bootstrap"

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


export default function Home(): JSX.Element
{
    const [ errorMessage, setErrorMessage ] = useState<JSX.Element | null>(null)

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
        <Row>
            <Col xxl={{ offset: 4, span: 4 }}>
                <Button variant="danger" type={ButtonType.BUTTON} onClick={handleLogout}>Wyloguj</Button>
            </Col>
        </Row>
    </Page>
}