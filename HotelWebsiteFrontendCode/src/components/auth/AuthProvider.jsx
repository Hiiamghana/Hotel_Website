import React, { createContext, useState, useContext } from "react"
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext() // ✅ EXPORT IT

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	const handleLogin = (token) => {
		try {
			const decodedUser = jwtDecode(token)
			localStorage.setItem("userId", decodedUser.sub)
			localStorage.setItem("userRole", decodedUser.roles)
			localStorage.setItem("token", token)
			setUser(decodedUser)
		} catch (error) {
			console.error("Invalid token:", error)
		}
	}

	const handleLogout = () => {
		localStorage.removeItem("userId")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
