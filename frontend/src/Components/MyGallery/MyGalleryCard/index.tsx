import React from 'react';
import "./style.scss"
import {Col, Image, ButtonGroup, Button} from "react-bootstrap";

type MyGalleryCardProps = {
    image_url: string
}

const MyGalleryCard = (props: MyGalleryCardProps) => (
    <Col xs={12} md={6} lg={4} className="">
        <div className="MyGalleryCard mb-4 box-shadow bg-white">
            <Image rounded className="MyGalleryCard-image" src={props.image_url} fluid />
            <div className="p-2 d-flex justify-content-between align-items-center">
                <ButtonGroup>
                    <Button
                        variant="outline-primary"
                        className="btn-sm"
                        onClick={() => window.open(props.image_url)}
                    >View</Button>
                    <a
                        className="btn btn-sm btn-outline-success"
                        href={props.image_url}
                        download
                        type="submit"
                    >
                        <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                            <path
                                d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
                            <path
                                d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                        </svg>
                    </a>
                </ButtonGroup>
                <small className="text-muted">9 mins</small>
            </div>
        </div>
    </Col>
)

export default MyGalleryCard;
