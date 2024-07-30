import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PokemonDetails = () => {
	const { id } = useParams()
	const [pokemon, setPokemon] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [evolutionChain, setEvolutionChain] = useState(null)
	const [locations, setLocations] = useState([])

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				setLoading(true)
				const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data = await response.json()

				const speciesResponse = await fetch(data.species.url)
				const speciesData = await speciesResponse.json()

				if (speciesData.evolution_chain) {
					const evolutionResponse = await fetch(speciesData.evolution_chain.url)
					const evolutionData = await evolutionResponse.json()
					setEvolutionChain(evolutionData)
				}

				if (data.location_area_encounters) {
					const locationResponse = await fetch(data.location_area_encounters)
					const locationData = await locationResponse.json()
					setLocations(locationData)
				}

				setPokemon({ ...data, ...speciesData })
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}

		fetchPokemon()
	}, [id])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error loading Pokémon data.</p>

	return (
		<div className='flex flex-wrap justify-evenly h-[100%]'>
			<div className='min-h-[60dvh] flex flex-col justify-center align-middle'>
				{/* Hero */}
				<div className='flex flex-wrap justify-center'>
					<img
						src={pokemon.sprites.other.dream_world.front_default}
						alt={pokemon.name}
						className=''
					/>
					<div className='self-center flex flex-col gap-4 md:w-1/2'>
						<h1 className='text-6xl capitalize font-bold self-center'>
							{pokemon.name}
						</h1>
						<p className='capitalize text-center'>
							<span className='font-medium mr-2 text-xl'>Type:</span>
							<span className='text-lg font-medium'>
								{pokemon.types.map((type) => type.type.name).join(', ')}
							</span>
						</p>
						<p className='p-3 mx-auto md:w-2/3 text-xl'>
							{
								pokemon.flavor_text_entries.find(
									(entry) => entry.language.name === 'en'
								).flavor_text
							}
						</p>
					</div>
				</div>
			</div>
			{/* Indepth */}
			<div className='grid grid-cols-6 md:w-[80%] self-center border-[#f2c444] border-[13px] flex-col p-3 gap-5 '>
				{/* Abilities */}
				<div className='flex flex-col gap-4 col-span-3'>
					<h2 className='font-medium border-4 p-3 bg-[#f8d57d] border-[#f2c444] text-center'>
						Abilities
					</h2>
					<ul className='list-disc list-inside flex flex-col h-[100%] border-4 p-3 bg-[#f2c44480] border-[#f2c444]'>
						{pokemon.abilities.map((ability) => (
							<li
								className='text-nowrap col-span-2 capitalize'
								key={ability.ability.name}
							>
								{ability.ability.name}
							</li>
						))}
					</ul>
				</div>
				{/* Moves */}
				<div className='flex flex-col gap-4 col-span-3'>
					<h2 className='font-medium border-4 p-3 bg-[#f8d57d] border-[#f2c444] text-center'>
						Moves
					</h2>
					<ul className='list-disc list-inside flex flex-col h-[100%] border-4 p-3 bg-[#f2c44480] border-[#f2c444]'>
						{pokemon.moves.slice(0, 6).map((move) => (
							<li
								className='text-nowrap col-span-2 capitalize'
								key={move.move.name}
							>
								{move.move.name}
							</li>
						))}
					</ul>
				</div>
				{/* Base stats */}
				<div className='flex flex-col gap-4 col-span-3'>
					<h2 className='font-medium border-4 p-3 bg-[#f8d57d] border-[#f2c444] text-center'>
						Base Stats
					</h2>
					<ul className='list-disc list-inside flex flex-col h-[100%] border-4 p-3 bg-[#f2c44480] border-[#f2c444]'>
						{pokemon.stats.map((stat) => (
							<li
								className='text-nowrap col-span-2 capitalize'
								key={stat.stat.name}
							>
								{stat.stat.name}:{' '}
								<span className='font-bold'>{stat.base_stat}</span>
							</li>
						))}
					</ul>
				</div>
				{/* Evolution Chain */}
				{evolutionChain && (
					<div className='flex flex-col gap-4 col-span-3'>
						<h2 className='font-medium border-4 p-3 bg-[#f8d57d] border-[#f2c444] text-center'>
							Evolution Chain
						</h2>
						<ul className='list-disc list-inside flex flex-col h-[100%] border-4 p-3 bg-[#f2c44480] border-[#f2c444]'>
							{evolutionChain.chain.evolves_to.map((evolution) => (
								<li
									className='text-nowrap col-span-2 capitalize'
									key={evolution.species.name}
								>
									{evolution.species.name}
								</li>
							))}
						</ul>
					</div>
				)}
				{/* Habitat */}
				<div className='flex flex-col gap-4 col-span-3'>
					<h2 className='font-medium border-4 p-3 bg-[#f8d57d] border-[#f2c444] text-center'>
						Habitat
					</h2>
					<ul className='list-disc list-inside flex flex-col h-[100%] border-4 p-3 bg-[#f2c44480] border-[#f2c444]'>
						<li className='capitalize'>
							{pokemon.habitat ? pokemon.habitat.name : 'Unknown'}
						</li>
					</ul>
				</div>
				{/* Egg Groups */}
				<div className='flex flex-col gap-4 col-span-3'>
					<h2 className='font-medium border-4 p-3 bg-[#f8d57d] border-[#f2c444] text-center'>
						Egg Groups
					</h2>
					<ul className='list-disc list-inside flex flex-col h-[100%] border-4 p-3 bg-[#f2c44480] border-[#f2c444]'>
						<li className='capitalize'>
							{pokemon.egg_groups.map((group) => group.name).join(', ')}
						</li>
					</ul>
				</div>
				{/* Held Items */}
				<div className='flex flex-col gap-4 col-span-3'>
					<h2 className='font-medium border-4 p-3 bg-[#f8d57d] border-[#f2c444] text-center'>
						Held Items
					</h2>
					<ul className='list-disc list-inside flex flex-col h-[100%] border-4 p-3 bg-[#f2c44480] border-[#f2c444]'>
						{pokemon.held_items.map((item) => (
							<li
								className='text-nowrap col-span-2 capitalize'
								key={item.item.name}
							>
								{item.item.name}
							</li>
						))}
					</ul>
				</div>
				{/* Sprites */}
				<div className='flex flex-col gap-4 col-span-3'>
					<h2 className='font-medium border-4 p-3 bg-[#f8d57d] border-[#f2c444] text-center'>
						Sprites
					</h2>
					<div className='border-4 p-3 bg-[#f2c44480] border-[#f2c444] flex justify-around'>
						{pokemon.sprites.front_default && (
							<img src={pokemon.sprites.front_default} alt='front' />
						)}
						{pokemon.sprites.back_default && (
							<img src={pokemon.sprites.back_default} alt='back' />
						)}
					</div>
				</div>
				{/* Locations */}
				<div className='flex flex-col gap-4 col-span-3'>
					<h2 className='font-medium border-4 p-3 bg-[#f8d57d] border-[#f2c444] text-center'>
						Game Locations
					</h2>
					<ul className='list-disc list-inside flex flex-col h-[100%] border-4 p-3 bg-[#f2c44480] border-[#f2c444]'>
						{locations.map((location) => (
							<li
								className='text-nowrap col-span-2 capitalize'
								key={location.location_area.name}
							>
								{location.location_area.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default PokemonDetails
