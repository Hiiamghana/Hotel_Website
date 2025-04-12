import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunctions";

const ViewRoom = () => {
    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { roomId } = useParams();

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId);
                setRoom(roomData);

                // Ensure correct image preview handling
                if (roomData.photo) {
                    setImagePreview(`data:image/jpeg;base64,${roomData.photo}`);
                }
            } catch (error) {
                console.error(error);
                setErrorMessage("Error fetching room details.");
            }
        };
        fetchRoom();
    }, [roomId]);

    return (
        <div className="container mt-5 mb-5">
            <h3 className="text-center mb-5 mt-5">View Room</h3>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <form>
                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label hotel-color">
                                Room Type
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="roomType"
                                name="roomType"
                                value={room.roomType}
                                readOnly // This prevents the warning
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label hotel-color">
                                Room Price
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="roomPrice"
                                name="roomPrice"
                                value={room.roomPrice}
                                readOnly // This prevents the warning
                            />
                        </div>

                        <div className="mb-3">
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Room Preview"
                                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                                    className="mt-3"
                                />
                            )}
                        </div>

                        <div className="d-grid gap-2 d-md-flex mt-2">
                            <Link to={"/existing-rooms"} className="btn btn-outline-info">
                                Back
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ViewRoom;
