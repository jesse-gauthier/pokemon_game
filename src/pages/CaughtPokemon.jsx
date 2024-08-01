import { useState, useEffect } from 'react'
import PokemonCard from '../components/PokemonCard'

const CaughtPokemon = () => {
	const [caughtPokemon, setCaughtPokemon] = useState([])

	useEffect(() => {
		const storedCaughtPokemon =
			JSON.parse(localStorage.getItem('caughtPokemon')) || []
		setCaughtPokemon(storedCaughtPokemon)
	}, [])

	const handleCatchRelease = () => {
		const caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon'))
		setCaughtPokemon(caughtPokemon)
	}

	return (
		<div className='py-4'>
			<div className='flex justify-between border-b-4 border-[#d2432e40] py-6'>
				<h2 className='text-center text-4xl my-2'>Caught Pokemon</h2>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 py-4'>
				{caughtPokemon.length > 0 ? (
					caughtPokemon.map((pokemon) => (
						<PokemonCard
							key={pokemon.id}
							pokemon={pokemon}
							onCatchRelease={handleCatchRelease}
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
