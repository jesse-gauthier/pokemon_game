import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PokemonDetails = () => {
	const { id } = useParams()
	const [pokemon, setPokemon] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				setLoading(true)
				const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data = await response.json()
				setPokemon(data)
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
			<div className='self-center flex justify-between h-[80%] border-[#f2c444] border-[13px] flex-col p-8 gap-5'>
				<h1 className='text-4xl capitalize font-bold self-center'>
					{pokemon.name}
				</h1>
				<img
					src={pokemon.sprites.other.dream_world.front_default}
					alt={pokemon.name}
				/>
			</div>
			<div className='grid grid-cols-6 w-[60%] h-[80%] self-center border-[#f2c444] border-[13px] flex-col p-8 gap-5 '>
				<div className='flex flex-col gap-4 col-span-3'>
					<h2 className='font-medium border-4 p-3 bg-[#f8d57d] border-[#f2c444] text-center'>
						Abilities
					</h2>
					<ul className='list-disc list-inside grid grid-cols-2 border-4 p-3 bg-[#f2c44480] border-[#f2c444]'>
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
				<div className='flex flex-col gap-4 col-span-3'>
					<h2 className='font-medium border-4 p-3 bg-[#f8d57d] border-[#f2c444] text-center'>
						Abilities
					</h2>
					<ul className='list-disc list-inside grid grid-cols-2 border-4 p-3 bg-[#f2c44480] border-[#f2c444]'>
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

				<div className='flex flex-col gap-4 col-span-3'>
					<h2 className='font-medium border-4 p-3 bg-[#f8d57d] border-[#f2c444] text-center'>
						Moves
					</h2>
					<ul className='list-disc list-inside grid grid-cols-2 border-4 p-3 bg-[#f2c44480] border-[#f2c444]'>
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
				<div className='flex flex-col gap-4 col-span-3'>
					<h2 className='font-medium border-4 p-3 bg-[#f8d57d] border-[#f2c444] text-center'>
						Moves
					</h2>
					<ul className='list-disc list-inside grid grid-cols-2 border-4 p-3 bg-[#f2c44480] border-[#f2c444]'>
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
			</div>
		</div>
	)
}

export default PokemonDetails
