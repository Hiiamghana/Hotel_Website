import React from "react";
import { Link } from "react-router-dom";

const Admin =()=>{

    return(

        <section className="conteiner mt-5 ">
            <h2>
                Wellcome To Admin Panel 
            </h2>
            <hr />
            <Link to={"/existing-rooms"}>
            Manage Rooms 
            
            </Link> <br />

            <Link to={"/existing-booking"}>
            Manage Bookings
            
            </Link>

        </section>
    )
}
export default Admin