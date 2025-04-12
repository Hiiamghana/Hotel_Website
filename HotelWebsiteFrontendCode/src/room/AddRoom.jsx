import React, { useState, useRef } from "react";
import { addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import ExistingRooms from "./ExistingRooms";
import { Link } from "react-router-dom";
const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Create a ref for the file input
    const fileInputRef = useRef(null);

    const handleRoomInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoom({
            ...newRoom,
            [name]: name === "roomPrice" ? parseInt(value) || "" : value,
        });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({ ...newRoom, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting Room Data:", newRoom);
            const response = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
            
            if (response) {  
                setSuccessMessage("A new room has been added to the database!");
                setErrorMessage("");
                
                // Reset form fields
                setNewRoom({ photo: null, roomType: "", roomPrice: "" });
                setImagePreview("");
                
                // Clear the file input value using the ref
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                
                // Clear the success message after 3 seconds
                setTimeout(() => setSuccessMessage(""), 3000);
            } else {
                setErrorMessage("Error adding room.");
                setTimeout(() => setErrorMessage(""), 3000);
            }
        } catch (error) {
            setErrorMessage(error.message || "An error occurred.");
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };

    return (
        <section className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Add a New Room</h2>

                    {successMessage && (
                        <div className="alert alert-success alert-dismissible fade show">
                            {successMessage}
                        
                        </div>
                    )}
                   

                    {errorMessage && (
                        <div className="alert alert-danger alert-dismissible fade show">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label">Room Type</label>
                            <RoomTypeSelector 
                                handleRoomInputChange={handleRoomInputChange} 
                                newRoom={newRoom} 
                                setNewRoom={setNewRoom} 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label">Room Price</label>
                            <input
                                className="form-control"
                                required
                                id="roomPrice"
                                type="number"
                                name="roomPrice"
                                value={newRoom.roomPrice}
                                onChange={handleRoomInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Room Photo</label>
                            <input 
                                id="photo" 
                                name="photo" 
                                type="file" 
                                className="form-control" 
                                onChange={handleImageChange}
                                ref={fileInputRef} // Attach the ref here
                            />
                            {imagePreview && (
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="mt-3 img-thumbnail" 
                                    style={{ maxWidth: "400px" }} 
                                />
                            )}
                        </div>
                        <div className="d-grid gap-2 d-md-flex mt-2">
                            <Link to={"/existing-rooms"} className="btn btn-outline-info">
                            Back 

                            </Link>

                        <button type="submit" className="btn btn-outline-primary">
                            Save Room
                            </button>
                            </div>
                    </form>
                </div>
            </div>
            
        </section>
    );
};

export default AddRoom;
