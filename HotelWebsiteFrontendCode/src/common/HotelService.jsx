import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaClock } from "react-icons/fa6";
import Header from "./Header";
import { FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from "react-icons/fa";

const HotelService = () => {
    return (
        <>
            <Container className="mb-2 ">
                <Header title={"Our Services"} />

                <Row>
                    <h4 className="text-center">

                        Services at <span className="hotel-color">Biswajit's - </span> Hotel
                        <span className="gap-2">
                            <FaClock /> -24 -Hour Front Desk
                        </span>
                    </h4>

                </Row>
                <hr />

                <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                    <Col>

                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaWifi /> Wifi

                                </Card.Title>
                                <Card.Text>
                                    Stay Connected with high-speed internet access.
                                </Card.Text>

                            </Card.Body>

                        </Card>
                    </Col>





                    <Col>

                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaUtensils /> Breakfast

                                </Card.Title>
                                <Card.Text>
                                    Start your day with delicious breakfast .
                                </Card.Text>

                            </Card.Body>

                        </Card>
                    </Col>



                    <Col>

                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaTshirt /> Laundry

                                </Card.Title>
                                <Card.Text>
                                    Keep your clothes clean and fresh with our loundry serrvice.
                                </Card.Text>

                            </Card.Body>

                        </Card>
                    </Col>




                    <Col>

                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaCocktail /> Mini-Bar

                                </Card.Title>
                                <Card.Text>
                                    Enjoy refresing drink and snacks from our mini- bar.
                                </Card.Text>

                            </Card.Body>

                        </Card>
                    </Col>



                    <Col>

                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaParking /> Parking

                                </Card.Title>
                                <Card.Text>
                                    Park your car in our parking .
                                </Card.Text>

                            </Card.Body>

                        </Card>
                    </Col>



                    <Col>

                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaSnowflake /> Air conditioning

                                </Card.Title>
                                <Card.Text>
                                    Stay cool and comfortable in our conditioning system.
                                </Card.Text>

                            </Card.Body>

                        </Card>
                    </Col>



                </Row>



            </Container>


        </>
    )
}

export default HotelService