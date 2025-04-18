import React, { useState } from "react";
import { Link,NavLink } from "react-router-dom";
import Logout from "../components/auth/Logout";

const NavBar = () => {
//     const [showAccount, setShowAccount] = useState(false);

//     const handleAccountClick = () => {
//         setShowAccount(!showAccount);
//     };

//     return (
//         <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
//             <div className="container-fluid">
//                 <Link to="/" className="navbar-brand hotel-color">
//                     Biswajit's Hotel
//                 </Link>

//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarScroll"
//                     aria-controls="navbarScroll"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 <div className="collapse navbar-collapse" id="navbarScroll">
//                     <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/browse-all-rooms">
//                                 Browse All Rooms
//                             </Link>
//                         </li>

//                         <li className="nav-item">
//                             <Link className="nav-link" to="/admin">
//                                 Admin
//                             </Link>
//                         </li>
//                     </ul>

//                     <ul className="navbar-nav d-flex">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/find-booking">
//                                 Find My Booking
//                             </Link>
//                         </li>

//                         {/* Account Dropdown */}
//                         <li className="nav-item dropdown">
//                             <button
//                                 className={`nav-link dropdown-toggle${showAccount ? " show" : ""}`}
//                                 id="navbarDropdown"
//                                 data-bs-toggle="dropdown"
//                                 aria-expanded="false"
//                                 onClick={handleAccountClick}
//                                 style={{ background: "none", border: "none", cursor: "pointer" }}
//                             >
//                                 Account
//                             </button>

//                             {/* <ul className={`dropdown-menu dropdown-menu-end${showAccount ? " show" : ""}`} aria-labelledby="navbarDropdown">
//                                 <li><Link className="dropdown-item" to="/login">Login</Link></li>
//                                 <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
//                                 <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
//                             </ul> */}


//                             <ul
//                                 className={`dropdown-menu ${showAccount ? "show" : ""}`}
//                                 aria-labelledby="navbarDropdown">
//                                 {isLoggedIn ? (
//                                     <Logout />
//                                 ) : (
//                                     <li>
//                                         <Link className="dropdown-item" to={"/login"}>
//                                             Login
//                                         </Link>
//                                     </li>
//                                 )}
//                             </ul>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };



const [showAccount, setShowAccount] = useState(false)

	const handleAccountClick = () => {
		setShowAccount(!showAccount)
	}

	const isLoggedIn = localStorage.getItem("token")
	const userRole = localStorage.getItem("userRole")

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
			<div className="container-fluid">
				<Link to={"/"} className="navbar-brand">
					<span className="hotel-color">Biswajit's Hotel</span>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarScroll">
					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
								Browse all rooms
							</NavLink>
						</li>

						{isLoggedIn && userRole === "ROLE_ADMIN" && (
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to={"/admin"}>
									Admin
								</NavLink>
							</li>
						)}
					</ul>

					<ul className="d-flex navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link" to={"/find-booking"}>
								Find my booking
							</NavLink>
						</li>

						<li className="nav-item dropdown">
							<a
								className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={handleAccountClick}>
								{" "}
								Account
							</a>

							<ul
								className={`dropdown-menu ${showAccount ? "show" : ""}`}
								aria-labelledby="navbarDropdown">
								{isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>
									</li>
								)}
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}


export default NavBar;
