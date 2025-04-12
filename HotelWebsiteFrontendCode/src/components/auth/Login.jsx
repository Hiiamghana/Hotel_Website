// import React, { useState } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { loginUser } from '../../utils/ApiFunctions'
// import { useAuth } from "./AuthProvider"

// const Login = () => {
//     const [errorMessage, setErrorMessage] = useState("")
// 	const [login, setLogin] = useState({
// 		email: "",
// 		password: ""
// 	})

// 	const navigate = useNavigate()
// 	const auth = useAuth()
// 	const location = useLocation()
// 	const redirectUrl = location.state?.path || "/"

// 	const handleInputChange = (e) => {
// 		setLogin({ ...login, [e.target.name]: e.target.value })
// 	}

// 	const handleSubmit = async (e) => {
// 		e.preventDefault()
// 		const success = await loginUser(login)
// 		if (success) {
// 			const token = success.token
// 			auth.handleLogin(token)
// 			navigate(redirectUrl, { replace: true })
// 		} else {
// 			setErrorMessage("Invalid username or password. Please try again.")
// 		}
// 		setTimeout(() => {
// 			setErrorMessage("")
// 		}, 4000)
// 	}

// 	return (
// 		<section className="container col-6 mt-5 mb-5">
// 			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
// 			<h2>
//                 Login
//                 </h2>
// 			<form onSubmit={handleSubmit}>
// 				<div className="row mb-3">
// 					<label htmlFor="email" 
//                     className="col-sm-2 col-form-label">
// 						Email
// 					</label>
// 					<div>
// 						<input
// 							id="email"
// 							name="email"
// 							type="email"
// 							className="form-control"
// 							value={login.email}
// 							onChange={handleInputChange}
// 						/>
// 					</div>
// 				</div>

// 				<div className="row mb-3">
// 					<label htmlFor="password" className="col-sm-2 col-form-label">
// 						Password
// 					</label>
// 					<div>
// 						<input
// 							id="password"
// 							name="password"
// 							type="password"
// 							className="form-control"
// 							value={login.password}
// 							onChange={handleInputChange}
// 						/>
// 					</div>
// 				</div>

// 				<div className="mb-3">
// 					<button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
// 						Login
// 					</button>
// 					<span style={{ marginLeft: "10px" }}>
// 						Don't' have an account yet?<Link to={"/register"}> Register</Link>
// 					</span>
// 				</div>
// 			</form>
// 		</section>
// 	)
// }

// export default Login


import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../../utils/ApiFunctions'
import { useAuth } from "./AuthProvider"

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("")
	const [login, setLogin] = useState({ email: "", password: "" })

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/"

	const handleInputChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const success = await loginUser(login)
		if (success) {
			const token = success.token
			auth.handleLogin(token)
			navigate(redirectUrl, { replace: true })
		} else {
			setErrorMessage("Invalid username or password. Please try again.")
		}
		setTimeout(() => setErrorMessage(""), 4000)
	}

	return (
		<section className="d-flex justify-content-center align-items-center vh-100">
			<div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: "12px" }}>
				<h2 className="text-center mb-4">Login</h2>

				{errorMessage && <p className="alert alert-danger text-center">{errorMessage}</p>}

				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label fw-bold">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={login.email}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="password" className="form-label fw-bold">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							className="form-control"
							value={login.password}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="d-grid">
						<button type="submit" className="btn btn-primary">Login</button>
					</div>

					<div className="text-center mt-3">
						<span>Don't have an account? <Link to={"/register"}>Register</Link></span>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Login
