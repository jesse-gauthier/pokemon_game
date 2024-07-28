import { useContext } from 'react'
import { DebugContext } from './DebugContext'

const DebugToggle = () => {
	const { isDebugMode, setIsDebugMode } = useContext(DebugContext)

	const toggleDebugMode = () => {
		setIsDebugMode((prevState) => !prevState)
	}

	return (
		<div>
			<p>Debug Mode is: {isDebugMode ? 'ON' : 'OFF'}</p>
			<button onClick={toggleDebugMode}>Toggle Debug Mode</button>
		</div>
	)
}

export default DebugToggle
