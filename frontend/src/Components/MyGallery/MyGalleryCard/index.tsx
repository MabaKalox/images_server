import React from 'react';
import "./style.scss"
import {Col, Image, ButtonGroup, Button} from "react-bootstrap";
import {ImageInfo} from '../types'
import axios from "axios";
import {Simulate} from "react-dom/test-utils";

interface MyGalleryCardProps extends ImageInfo {
    handle_update_list: () => void
}

const MyGalleryCard = (props: MyGalleryCardProps) => {
    const handle_delete = () => {
        axios.get("/images/delete_image", {
            params: {
                image_id: props.image_id
            }
        }).then((response) => {
            props.handle_update_list()
        }).catch((error) => {

        })
    }

    return (<Col xs={12} md={6} lg={4} className="">
        <div className="MyGalleryCard mb-4 box-shadow bg-white">
            <Image rounded className="MyGalleryCard-image" src={props.image_path} fluid/>
            <div className="p-2 d-flex justify-content-between align-items-center">
                <ButtonGroup>
                    <Button
                        variant="outline-primary"
                        className="btn-sm"
                        onClick={() => window.open(props.image_path)}
                    >View</Button>
                    <a className="btn btn-sm btn-outline-success" href={props.image_path}
                       download type="submit">
                        <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                            <path
                                d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
                            <path
                                d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                        </svg>
                    </a>
                    <Button
                        variant="outline-danger"
                        className="btn-sm"
                        onClick={handle_delete}
                    >Delete</Button>
                </ButtonGroup>
                <small className="text-muted">{props.image_timestamp}</small>
            </div>
        </div>
    </Col>)
}

export default MyGalleryCard;
