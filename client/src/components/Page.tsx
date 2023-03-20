import { PropsWithChildren } from "react"
import { Container } from "react-bootstrap"
import ErrorModal from "./ErrorModal"

export interface PageProps
{
    errorMessage?: JSX.Element | null
}

export default function Page({ children, errorMessage }: PropsWithChildren<PageProps>): JSX.Element
{
    return <Container fluid className="app">
        <ErrorModal>
            { errorMessage }
        </ErrorModal>
        { children }
    </Container>
}