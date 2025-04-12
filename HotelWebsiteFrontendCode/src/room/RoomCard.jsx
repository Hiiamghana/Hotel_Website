import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
    return (
        <Card className="mb-3 p-3 shadow-sm border-0 rounded">
            <Row className="align-items-center">
                {/* Room Image */}
                <Col md={3} className="text-center">
                <Link to={`/book-room/${room.id}`}>

                    <Card.Img
                        src={`data:image/jpeg;base64,${room.photo}`}
                        alt={room.roomType}
                        className="rounded img-fluid"
                        style={{ maxWidth: "180px", height: "auto" }}
                    />
                    </Link>

                </Col>

                {/* Room Details */}
                <Col md={6}>
                    <h5 className="hotel-color mb-1">{room.roomType}</h5>
                    <p className="text-muted fw-bold mb-1">{room.roomPrice} / night</p>
                    <p className="text-secondary">Some room information goes here for the guest to read</p>
                </Col>

                {/* View/Book Button */}
                <Col md={3} className="text-end">
                    <Link to={`/book-room/${room.id}`} className="btn btn-primary px-4">
                        View/Book Now
                    </Link>
                </Col>
            </Row>
        </Card>
    );
};

export default RoomCard;
