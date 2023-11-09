import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const HomepageMovies = () => {
 return (
        <Container fluid>
               <Row>
                <Col>
                <span style={{fontSize:"35px", fontWeight:"600"}} className="float-start ms-4">Featured Movie</span>
                <span style={{color:"red", fontWeight:"500"}} className="float-end mt-3 me-4">See more</span>
                </Col>
                </Row>
        </Container>
 );
}

export default HomepageMovies;