
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../utils/ApiFunctions';

const Registration = () => {
    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [emailError, setEmailError] = useState(""); // Gmail-specific error

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Gmail validation for email field
        if (name === "email") {
            const isValidGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);
            setEmailError(isValidGmail ? "" : "Only @gmail.com emails are allowed");
        }

        setRegistration(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        // Block form submission if Gmail validation fails
        if (emailError) {
            setErrorMessage("Please enter a valid Gmail address.");
            return;
        }

        try {
            const result = await registerUser(registration);
            setSuccessMessage(result);
            setErrorMessage("");
            setRegistration({ firstName: "", lastName: "", email: "", password: "" });
        } catch (error) {
            setSuccessMessage("");
            setErrorMessage(`Registration error: ${error.message}`);
        }

        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 5000);
    };

    return (
        <section className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: "12px" }}>
                <h2 className="text-center mb-4">Register</h2>

                {errorMessage && <p className="alert alert-danger text-center">{errorMessage}</p>}
                {successMessage && <p className="alert alert-success text-center">{successMessage}</p>}

                <form onSubmit={handleRegistration}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label fw-bold">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="form-control"
                            value={registration.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label fw-bold">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-control"
                            value={registration.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`form-control ${emailError ? "is-invalid" : ""}`}
                            value={registration.email}
                            onChange={handleInputChange}
                            required
                        />
                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            value={registration.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>

                    <div className="text-center mt-3">
                        <span>Already have an account? <Link to={"/login"}>Login</Link></span>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Registration;
