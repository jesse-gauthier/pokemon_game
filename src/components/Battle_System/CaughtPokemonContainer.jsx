import { useState, useEffect } from 'react'
import PokemonCard from '../PokemonCard'

const CaughtPokemonCard = () => {
	const [caughtPokemon, setCaughtPokemon] = useState([])

	useEffect(() => {
		const storedCaughtPokemon =
			JSON.parse(localStorage.getItem('caughtPokemon')) || []
		setCaughtPokemon(storedCaughtPokemon)
	}, [])

	return (
		<div className='border-red-400 border-4 w-100 min-h-[200px] py-5 mt-5'>
			<h2 className='text-center text-4xl'>Choose Your Pokemon</h2>
			<div className='flex justify-evenly'>
				{caughtPokemon.length > 0 ? (
					caughtPokemon.map((pokemon) => (
						<PokemonCard
							key={pokemon.id}
							pokemon={pokemon}
							buttonText={'Select'}
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

export default CaughtPokemonCard
