import { PropsWithChildren, useCallback, useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import EmptyDep from "../data/constans/EmptyDep"
import "../assets/sass/ErrorModal.sass"

export default function ErrorModal({ children }: PropsWithChildren): JSX.Element
{
    const [ show, setShow ] = useState(false)
    
    const closeModal = useCallback(() => setShow(false), EmptyDep)

    useEffect(() => children ? setShow(true) : setShow(false), [ children ])

    return <Modal show={show} className="error-message" contentClassName="error-message-container" onHide={closeModal} centered animation scrollable>
        <Modal.Header>
            <Modal.Title>Błąd</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ children }</Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={closeModal}>Zamknij</Button>
        </Modal.Footer>
    </Modal>
}