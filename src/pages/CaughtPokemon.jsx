/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import PokemonCard from '../components/PokemonCard'
const CaughtPokemon = ({ usePokemonCatch }) => {
	const [caughtPokemon, setCaughtPokemon] = useState([])

	useEffect(() => {
		const storedCaughtPokemon =
			JSON.parse(localStorage.getItem('caughtPokemon')) || []
		setCaughtPokemon(storedCaughtPokemon)
	}, [])

	const handlesRelease = (pokemon) => {
		// Retrieve the caughtPokemon array from local storage
		let caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon')) || []

		// Filter out the Pokémon with the matching id
		caughtPokemon = caughtPokemon.filter((p) => p.id !== pokemon.id)

		// Save the updated array back to local storage
		localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon))

		// Update the state with the updated array
		setCaughtPokemon(caughtPokemon)
	}

	return (
		<div className='py-4'>
			<div className='flex justify-between border-b-4 border-[#d2432e40] py-6'>
				<h2 className='text-center text-4xl'>
					{caughtPokemon.length} Caught Pokemon
				</h2>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 py-4'>
				{caughtPokemon.length > 0 ? (
					caughtPokemon.map((pokemon) => (
						<PokemonCard
							key={pokemon.id}
							pokemon={pokemon}
							handlesRelease={handlesRelease}
							usePokemonCatch={usePokemonCatch}
							isCaught={true}
						/>
					))
				) : (
					<p className='text-center text-xl col-span-full'>
						No Pokemon caught yet.
					</p>
				)}
			</div>
		</div>
	)
}

export default CaughtPokemon
