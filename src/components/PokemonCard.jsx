/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const PokemonCard = ({ pokemon, onCatchRelease }) => {
	const [isCaught, setIsCaught] = useState(false)

	useEffect(() => {
		const caughtPokemon =
			JSON.parse(localStorage.getItem('caughtPokemon')) || []
		if (caughtPokemon.some((p) => p.id === pokemon.id)) {
			setIsCaught(true)
		}
	}, [pokemon.id])

	const handleCatch = () => {
		const caughtPokemon =
			JSON.parse(localStorage.getItem('caughtPokemon')) || []

		if (isCaught) {
			// Remove the Pokémon from caughtPokemon array
			const updatedCaughtPokemon = caughtPokemon.filter(
				(p) => p.id !== pokemon.id
			)
			localStorage.setItem(
				'caughtPokemon',
				JSON.stringify(updatedCaughtPokemon)
			)
			setIsCaught(false)
			onCatchRelease(updatedCaughtPokemon)
		} else {
			// Add the Pokémon to caughtPokemon array
			if (!caughtPokemon.some((p) => p.id === pokemon.id)) {
				caughtPokemon.push(pokemon)
				localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon))
				setIsCaught(true)
				onCatchRelease(caughtPokemon)
			}
		}
	}

	return (
		<div
			className={`border-[13px] p-2 rounded-xl flex flex-col ${
				isCaught ? 'border-[#f3701b]' : 'border-[#FFCC5C]'
			}`}
		>
			<div className='flex justify-between flex-wrap'>
				<h3 className='capitalize text-3xl font-bold self-center'>
					{pokemon.name}
				</h3>
				<p className='text-[#FF6F61] font-black self-center text-2xl'>
					{pokemon.xp} HP
				</p>
			</div>
			<img
				className='w-[80%] h-[80%] object-contain my-3 mx-auto'
				src={pokemon.img}
				alt={pokemon.name}
			/>
			<div className='flex flex-wrap justify-evenly gap-y-2'>
				<button
					onClick={handleCatch}
					className={`btn self-center btn-outline capitalize w-[100%] md:w-[43%] text-lg font-normal ${
						isCaught ? 'bg-[#f3701b] text-black' : 'bg-[white] text-black'
					}`}
				>
					{isCaught ? 'release' : 'catch'}
				</button>
				<Link
					to={`/pokemon/${pokemon.id}`}
					className={`btn self-center btn-outline capitalize md:w-[43%] w-[100%] text-lg font-normal ${
						isCaught ? 'bg-[white] text-black' : 'bg-[#70c1b3] text-black'
					}`}
				>
					View
				</Link>
			</div>
		</div>
	)
}

export default PokemonCard
