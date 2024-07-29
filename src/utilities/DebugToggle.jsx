import { useContext } from 'react'
import { DebugContext } from './DebugContext'

const clearLocalStorage = () => {
	localStorage.removeItem('pokemonData')
	localStorage.removeItem('pokemonTimestamp')
}

const DebugToggle = () => {
	const { isDebugMode, setIsDebugMode } = useContext(DebugContext)

	const toggleDebugMode = () => {
		setIsDebugMode((prevState) => !prevState)
	}

	return (
		<div className='flex flex-col justify-end'>
			<button
				className='btn btn-md w-fit ml-auto btn-warning'
				onClick={toggleDebugMode}
			>
				Toggle Debug Mode
			</button>
			{isDebugMode && (
				<div className='flex justify-end gap-3 my-5'>
					<button onClick={clearLocalStorage} className='btn btn-md btn-error'>
						Clear Wild Pokemon
					</button>
					<button onClick={clearLocalStorage} className='btn btn-md btn-error'>
						Clear Caught Pokemon
					</button>
				</div>
			)}
		</div>
	)
}

export default DebugToggle
