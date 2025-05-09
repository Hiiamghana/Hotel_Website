import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllRooms } from '../utils/ApiFunctions';
import { Card, Carousel, Container, Row, Col } from 'react-bootstrap';

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms()
            .then((data) => {
                setRooms(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className='mt-5'>Loading rooms.....</div>;
    }

    if (errorMessage.trim() !== "") {
        return <div className='text-danger mb-5 mt-5'>Error: {errorMessage}</div>;
    }

    return (
        <section className='bg-light mb-5 mt-5 shadow'>
            <div className="text-center">
                <Link to="/browse-all-rooms" className="hotel-color">Browse all rooms</Link>
            </div>

            <Container>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                    <Col key={room.id} xs={12} md={6} lg={3} className="mb-4">
                                        <Card>
                                             <Link to={`/book-room/${room.id}`}>
                                                <Card.Img
                                                    variant='top'
                                                    src={`data:image/png;base64,${room.photo}`}
                                                    alt='Room Photo'
                                                    className='w-100'
                                                    style={{ height: "200px", objectFit: "cover" }}
                                                />
                                            </Link>
                                            <Card.Body>
                                                <Card.Title className='hotel-color'>{room.roomType}</Card.Title>
                                                <Card.Title className='room-price'>{room.roomPrice}/night</Card.Title>
                                                <div className='flex-shrink-0'>
                                                     <Link to={`/book-room/${room.id}`} className="btn btn-primary px-4">
                                                        Book Now
                                                    </Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
};

export default RoomCarousel;
