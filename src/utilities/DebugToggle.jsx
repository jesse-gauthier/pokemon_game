import { useContext } from 'react'
import { DebugContext } from './DebugContext'

const clearWildPokemon = () => {
	localStorage.removeItem('pokemonData')
	localStorage.removeItem('pokemonTimestamp')
	window.location.reload()
}

const clearCaughtPokemon = () => {
	localStorage.removeItem('caughtPokemon')
	window.location.reload()
}

const DebugToggle = () => {
	const { isDebugMode, setIsDebugMode } = useContext(DebugContext)

	const toggleDebugMode = () => {
		setIsDebugMode((prevState) => !prevState)
	}

	return (
		<div className='flex flex-col justify-end'>
			<button
				className='btn btn-md w-[100%] ml-auto btn-warning'
				onClick={toggleDebugMode}
			>
				Toggle Debug Mode
			</button>
			{isDebugMode && (
				<div className='flex flex-col justify-end gap-3 my-5'>
					<button onClick={clearWildPokemon} className='btn btn-md btn-error'>
						Clear Wild Pokemon
					</button>
					<button onClick={clearCaughtPokemon} className='btn btn-md btn-error'>
						Clear Caught Pokemon
					</button>
				</div>
			)}
		</div>
	)
}

export default DebugToggle
