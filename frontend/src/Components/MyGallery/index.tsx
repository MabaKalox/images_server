import React, {useRef, useState, useEffect} from 'react';
import "./style.scss"
import {Container, Row, Col, Button} from "react-bootstrap";
import MyGalleryCard from "./MyGalleryCard";
import axios from "axios";

const MyGallery = () => {
    const [images_path_list, set_images_path_list] = useState<string[]>([]);
    const update_list_btn_icon = useRef<SVGSVGElement>(null);

    const handle_update_list = () => {
        if (update_list_btn_icon && update_list_btn_icon.current) {
            update_list_btn_icon.current.style.animationPlayState = 'running';
        }
        axios.get("/images/get_images_list")
            .then((response) => {
                set_images_path_list(response.data['images_path_list'])
            })
            .catch((error) => {

            }).finally(() => {
                if (update_list_btn_icon && update_list_btn_icon.current) {
                    update_list_btn_icon.current.style.animationPlayState = 'paused';
                }
            }
        )
    }

    useEffect(() => {
        handle_update_list()
    }, [])

    return (
        <Container fluid className="MyGallery p-0">
            <Row>
                <Col className="p-3">
                    <Container>
                        <Button onClick={handle_update_list} variant="info">
                            Update List
                            <svg ref={update_list_btn_icon} xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                 fill="currentColor"
                                 className="update_list_btn_icon bi bi-arrow-repeat ml-1" viewBox="0 0 16 16">
                                <path
                                    d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                                <path fill-rule="evenodd"
                                      d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                            </svg>
                        </Button>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="bg-light">
                        <Container className="py-3">
                            <Row>
                                {images_path_list.map((image_url) => <MyGalleryCard image_url={image_url}/>)}
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default MyGallery;
