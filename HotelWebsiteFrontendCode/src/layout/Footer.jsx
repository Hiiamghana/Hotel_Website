import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-3 mt-auto">
            <Container>
                <Row className="align-items-center">
                    {/* Centered Hotel Copyright Text */}
                    <Col xs={12} md={8} className="text-center mx-auto">
                        <p>&copy; 2025 Biswajit's Hotel</p>
                    </Col>

                    {/* Developer Details (Aligned Right on Medium+ Screens) */}
                    <Col xs={12} md={8} className="text-md-end text-center">
                        <p className="mb-0">
                            Developed by <strong>Biswajit Dalai</strong> |{" "}
                            <a 
                                href="https://www.facebook.com/biswajit.dalai.12532?mibextid=ZbWKwL" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-light text-decoration-none mx-2"
                            >
                                <FaFacebook size={20} className="me-1" />
                                Facebook
                            </a> 
                            |  
                            <a 
                                href="https://www.linkedin.com/in/biswajit-dalai-092862271" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-light text-decoration-none mx-2"
                            >
                                <FaLinkedin size={20} className="me-1" />
                                LinkedIn
                            </a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
