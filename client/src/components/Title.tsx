import { Row, Col, Image } from "react-bootstrap"
import logoURL from "../assets/images/logo.png"

export default function Title(): JSX.Element
{
    return <Row>
        <Col xs={12}>
            <div className="app-title-container">
                <h1 className="app-title">Straight Flush</h1>
                <Image className="app-title-logo" src={logoURL} alt="logo" />
            </div>
        </Col>
    </Row>
}