/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

// Create the context
const DebugContext = createContext()

// Create the provider component
const DebugProvider = ({ children }) => {
	// Initialize the debug mode state
	const [isDebugMode, setIsDebugMode] = useState(false)

	return (
		<DebugContext.Provider value={{ isDebugMode, setIsDebugMode }}>
			{children}
		</DebugContext.Provider>
	)
}

export { DebugProvider, DebugContext }
