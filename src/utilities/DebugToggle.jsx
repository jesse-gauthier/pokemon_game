import { useContext } from 'react'
import { DebugContext } from './DebugContext'

const DebugToggle = () => {
	const { isDebugMode, setIsDebugMode } = useContext(DebugContext)

	const toggleDebugMode = () => {
		setIsDebugMode((prevState) => !prevState)
	}

	return (
		<div className='flex flex-col gap-3 my-4'>
			<button
				className='btn btn-md ml-auto rounded-r-none'
				onClick={toggleDebugMode}
			>
				Toggle Debug Mode
			</button>
		</div>
	)
}

export default DebugToggle
