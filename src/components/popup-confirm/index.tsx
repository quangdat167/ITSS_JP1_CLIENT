import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function PopupConfirm({
    show,
    setShow,
    renderHeader,
    renderBody,
    handleEvent,
}: {
    show: boolean;
    setShow: Function;
    renderHeader: any;
    renderBody: any;
    handleEvent: Function;
}) {
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{renderHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{renderBody}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="error" onClick={() => handleEvent()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupConfirm;
