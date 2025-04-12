import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { FaTrashAlt, FaEye, FaEdit, FaPlus } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";

// import EditRoom from "./EditRoom";

const ExistingRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            const result = await getAllRooms();
            console.log("Fetched rooms:", result);
            setRooms(result);
            setFilteredRooms(result);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("Filtering rooms for type:", selectedRoomType, rooms);
        if (!selectedRoomType) {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    }, [rooms, selectedRoomType]);

    const handlePaginatorClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    const handleDelete = async (roomId) => {
        try {
            const success = await deleteRoom(roomId);
            if (success === 200) {
                console.log("true")
                setSuccessMessage(`Room No ${roomId} was deleted.`);
                fetchRooms();  // Refresh rooms list after deletion
            } else {
                setErrorMessage(`Error deleting room ${success}`);
            }
        } catch (error) {
            setErrorMessage(error.message)
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };



    const calculateTotalPages = () => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.max(1, Math.ceil(totalRooms / roomsPerPage));
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    console.log(rooms)
    return (
        <>
            {isLoading ? (
                <p>Loading existing rooms...</p>
            ) : (
                <section className="mt-5 mb-5 container">
                    <div className="d-flex justify-content-between mb-3 mt-5">
                        <h2>Existing Rooms</h2>


                    </div>
                    <Row>
                        <div className="col-md-6 mb-3 mb-md-0">
                            <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                        </div>

                        <Col md={6}  className="d-flex justify-content-end">
                        <Link to={"/add-room"}>
                                <FaPlus /> Add Room

                            </Link>
                        
                        </Col>

                        
                    </Row>






                    {successMessage && <p className="text-success">{successMessage}</p>}
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}

                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Room Type</th>
                                <th>Room Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRooms.map((room) => (
                                <tr key={room.id} className="text-center">
                                    <td>{room.id}</td>
                                    <td>{room.roomType}</td>
                                    <td>{room.roomPrice}</td>
                                    <td className="gap-2">

                                        <Link to={`/view-room/${room?.id}`} className="btn btn-info btn-sm mx-1">
                                            <FaEye />
                                        </Link>

                                        <Link to={`/edit-room/${room?.id}`} className="btn btn-warning btn-sm mx-1">
                                            <FaEdit />
                                        </Link>


                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(room.id)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={calculateTotalPages()}
                        onPageChange={handlePaginatorClick}
                    />
                </section>
            )}
        </>
    );
};

export default ExistingRooms;
