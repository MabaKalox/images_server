import React from 'react';
import MyGallery from "../MyGallery";
import {Container, Row, Col} from "react-bootstrap";
import './style.scss';

function App() {

  return (
    <Container fluid className="App px-0">
        <Row>
            <Col>
                <MyGallery />
            </Col>
        </Row>
    </Container>
  );
}

export default App;
