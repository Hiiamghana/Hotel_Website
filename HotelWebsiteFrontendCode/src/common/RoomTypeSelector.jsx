import React, { useEffect, useState } from "react";
import { getRoomType } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom, setNewRoom }) => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false);
    const [newRoomType, setNewRoomType] = useState("");

    useEffect(() => {
        getRoomType().then((data) => {
            if (Array.isArray(data)) setRoomTypes(data);
        }).catch((error) => console.error("Error fetching room types:", error));
    }, []);

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    };

    const handleAddNewRoomType = () => {
        if (newRoomType.trim() !== "" && !roomTypes.includes(newRoomType)) {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoom({ ...newRoom, roomType: newRoomType }); // Auto-select new type
        }
        setNewRoomType("");
        setShowNewRoomTypesInput(false);
    };

    return (
        <div>
            <select
                id="roomType"
                name="roomType"
                value={newRoom.roomType || ""}
                onChange={(e) => {
                    const selectedValue = e.target.value;
                    if (selectedValue === "Add New") {
                        setShowNewRoomTypesInput(true);
                        setNewRoom({ ...newRoom, roomType: "" });
                    } else {
                        setShowNewRoomTypesInput(false);
                        setNewRoom({ ...newRoom, roomType: selectedValue });
                        handleRoomInputChange(e);
                    }
                }}
            >
                <option value="">Select a room type</option>
                {roomTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
                <option value="Add New">Add New</option>
            </select>

            {showNewRoomTypeInput && (
                <div className="input-group mt-2">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Enter a new room type"
                        value={newRoomType}
                        onChange={handleNewRoomTypeInputChange}
                    />
                    <button className="btn btn-primary" type="button" onClick={handleAddNewRoomType}>
                        Add
                    </button>
                </div>
            )}
        </div>
    );
};

export default RoomTypeSelector;
