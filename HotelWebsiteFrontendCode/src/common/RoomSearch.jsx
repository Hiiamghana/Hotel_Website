import React, { useState } from "react"
import { Form, Button, Row, Col, Container, Card, Spinner } from "react-bootstrap"
import moment from "moment"
import { getAvailableRooms } from "../utils/ApiFunctions"
import RoomSearchResults from "./RoomSearchResult"
import RoomTypeSelector from "./RoomTypeSelector"

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        roomType: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [availableRooms, setAvailableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        const checkInMoment = moment(searchQuery.checkInDate)
        const checkOutMoment = moment(searchQuery.checkOutDate)
        if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
            setErrorMessage("Please enter valid dates")
            return
        }
        if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
            setErrorMessage("Check-out date must be after check-in date")
            return
        }
        setIsLoading(true)
        getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
            .then((response) => {
                setAvailableRooms(response.data)
                setTimeout(() => setIsLoading(false), 2000)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSearchQuery({ ...searchQuery, [name]: value })
        const checkInDate = moment(searchQuery.checkInDate)
        const checkOutDate = moment(searchQuery.checkOutDate)
        if (checkInDate.isValid() && checkOutDate.isValid()) {
            setErrorMessage("")
        }
    }
    const handleClearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: ""
        })
        setAvailableRooms([])
    }

    return (
        <Container className="my-5">
            <Card className="shadow-lg">
                <Card.Header className="bg-primary text-white">
                    <h4 className="mb-0">Find Your Perfect Room</h4>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSearch}>
                        <Row className="align-items-end">
                            <Col xs={12} md={3}>
                                <Form.Group controlId="checkInDate">
                                    <Form.Label className="fw-bold">Check-in Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="checkInDate"
                                        value={searchQuery.checkInDate}
                                        onChange={handleInputChange}
                                        min={moment().format("YYYY-MM-DD")}
                                        className="rounded-0"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={3}>
                                <Form.Group controlId="checkOutDate">
                                    <Form.Label className="fw-bold">Check-out Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="checkOutDate"
                                        value={searchQuery.checkOutDate}
                                        onChange={handleInputChange}
                                        min={moment().format("YYYY-MM-DD")}
                                        className="rounded-0"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={4}>
                                <Form.Group controlId="roomType">
                                    <Form.Label className="fw-bold">Room Type</Form.Label>
                                    <div className="d-flex gap-2">
                                        <RoomTypeSelector
                                            handleRoomInputChange={handleInputChange}
                                            newRoom={searchQuery}
                                            className="flex-grow-1"
                                        />
                                        <Button 
                                            variant="primary" 
                                            type="submit" 
                                            className="rounded-0"
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>

                    {errorMessage && (
                        <div className="mt-3 text-center text-danger fw-bold">
                            {errorMessage}
                        </div>
                    )}
                </Card.Body>
            </Card>

            <div className="mt-4">
                {isLoading ? (
                    <div className="text-center py-4">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-2">Finding available rooms...</p>
                    </div>
                ) : availableRooms && availableRooms.length > 0 ? (
                    <RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch} />
                ) : (
                    availableRooms !== null && (
                        <Card className="text-center py-4">
                            <Card.Body>
                                <h5>No rooms available for the selected dates and room type.</h5>
                                <p className="text-muted">Please try different search criteria.</p>
                            </Card.Body>
                        </Card>
                    )
                )}
            </div>
        </Container>
    )
}

export default RoomSearch