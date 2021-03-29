import React, {useRef, useState, useEffect} from 'react';
import "./style.scss"
import {Container, Row, Col, Button} from "react-bootstrap";
import MyGalleryCard from "./MyGalleryCard";
import axios from "axios";
import {ImageInfo} from './types'
import UploadButton from './UploadButton/index'


const get_loading_className = (is_updating: boolean) => {
    if (is_updating) {
        return 'loading'
    } else {
        return 'loading loading--paused'
    }
}


const MyGallery = () => {
    const [images_list, set_images_list] = useState<ImageInfo[]>([]);
    const [is_updating, set_is_updating] = useState(false);

    const update_list_handler = () => {
        set_is_updating(true)
        axios.get("/images/get_images_list")
            .then((response) => {
                set_images_list(response.data)
            })
            .catch((error) => {

            }).finally(() => {
                set_is_updating(false)
            }
        )
    }

    useEffect(() => {
        update_list_handler()
    }, [])

    return (
        <Container fluid className="MyGallery p-0">
            <Row>
                <Col className="p-3">
                    <Container>
                        <Row className="justify-content-md-center justify-content-between">
                            <Col className="col-auto">
                                <Button onClick={update_list_handler} variant="info">
                                    Update List
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className={['bi', 'bi-arrow-repeat', 'ml-1', get_loading_className(is_updating)].join(' ')}
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                                        <path fill-rule="evenodd"
                                              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                                    </svg>
                                </Button>
                            </Col>
                            <Col className="col-auto">
                                <UploadButton upload_url="/images/upload_image/"
                                              update_list_handler={update_list_handler}/>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="bg-light">
                        <Container className="py-3">
                            <Row>
                                {images_list.map((image_info) => <MyGalleryCard
                                    {...image_info}
                                    handle_update_list={update_list_handler}
                                />)}
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default MyGallery;
