import { Badge, Col, Row } from "react-bootstrap"
import Page from "../components/Page"
import Title from "../components/Title"

export default function NotFound(): JSX.Element
{
    return <Page>
        <Title />
        <Row>
            <Col xxl={{ span: 6, offset: 3 }}>
                <h1 className="app-not-found text-center"><Badge bg="light" text="dark">404</Badge> Nie odnaleziono strony</h1>
            </Col>
        </Row>
    </Page>
}