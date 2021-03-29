import React from 'react';
import "./style.scss"
import {Col, Image, ButtonGroup, Button} from "react-bootstrap";
import {ImageInfo} from '../types'
import axios from "axios";

interface MyGalleryCardProps extends ImageInfo {
    handle_update_list: () => void
}

const MyGalleryCard = (props: MyGalleryCardProps) => {
    const handle_delete = () => {
        if (window.confirm("Do you want to delete this image?")) {
            axios.get("/images/delete_image", {
                params: {
                    image_id: props.image_id
                }
            }).then((response) => {
                props.handle_update_list()
            }).catch((error) => {

            })
        }
    }

    const utc_to_local_string = (utc_datetime: string) => {
        const utc_datetime_obj = new Date(utc_datetime)
        const time_offset = new Date().getTimezoneOffset()
        utc_datetime_obj.setMinutes(utc_datetime_obj.getMinutes() - time_offset)
        return utc_datetime_obj.toLocaleString()
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-download" viewBox="0 0 16 16">
                            <path
                                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path
                                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                    </a>
                    <Button
                        variant="outline-danger"
                        className="btn-sm"
                        onClick={handle_delete}
                    >Delete</Button>
                </ButtonGroup>
                <small className="text-muted">
                    {utc_to_local_string(props.image_timestamp)}
                </small>
            </div>
        </div>
    </Col>)
}

export default MyGalleryCard;
