/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const ActionButton = ({
	pokemon,
	isCaught,
	handlesRelease,
	onFirstCatch,
	startFireworks,
}) => {
	// Function to trigger the release action
	const triggerRelease = (pokemon) => {
		handlesRelease(pokemon)
	}

	// Function to check for the presence of 'caughtPokemon' in local storage
	const checkFirstCatch = () => {
		const caughtPokemon = localStorage.getItem('caughtPokemon')
		return !caughtPokemon
	}

	// Check if it's the first catch
	const isFirstCatch = checkFirstCatch()

	return isFirstCatch ? (
		<button
			onClick={() => onFirstCatch(pokemon)}
			className='bg-[#70c1b3] text-black btn self-center btn-outline capitalize md:w-[43%] w-[100%] text-lg font-normal'
		>
			First Catch
		</button>
	) : isCaught ? (
		<button
			onClick={() => triggerRelease(pokemon)}
			className='bg-[#70c1b3] text-black btn self-center btn-outline capitalize md:w-[43%] w-[100%] text-lg font-normal'
		>
			Release
		</button>
	) : (
		<Link
			to={`/battle/${pokemon.id}`}
			className='bg-[#70c1b3] text-black btn self-center btn-outline capitalize md:w-[43%] w-[100%] text-lg font-normal'
		>
			Catch
		</Link>
	)
}

export default ActionButton
