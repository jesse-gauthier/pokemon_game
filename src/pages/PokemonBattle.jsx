import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import pokemonFetch from '../utilities/PokemonFetch'
import BattleCard from '../components/Battle_System/BattleCard'

const PokemonBattle = () => {
	const { id } = useParams()
	const [AttackPokemon, setPokemon] = useState(null)
	const [DefendPokemon, setDefendPokemon] = useState([])

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const fetchedPokemon = await pokemonFetch(id)
				setPokemon(fetchedPokemon)
			} catch (error) {
				console.error('Failed to fetch pokemon:', error)
			}
		}

		fetchPokemon()
	}, [id])

	useEffect(() => {
		const fetchCaughtPokemon = () => {
			const caughtPokemon = localStorage.getItem('caughtPokemon')
			return caughtPokemon ? JSON.parse(caughtPokemon) : []
		}
		setDefendPokemon(fetchCaughtPokemon())
	}, [])
	console.log(DefendPokemon)
	if (!AttackPokemon) {
		return <div>Loading...</div>
	}

	return (
		<div className='pt-5 flex flex-col gap-16'>
			<h2 className='text-6xl font-bold text-center mt-5'>Prepare to Battle</h2>
			<div className='flex flex-col justify-center'>
				<div className='flex md:flex-col flex-wrap justify-center'>
					{/* Attack Pokemon */}
					<BattleCard pokemon={AttackPokemon} />
					<div className='mt-14'>
						{DefendPokemon.map((pokemon, index) => (
							<BattleCard key={index} pokemon={pokemon} defend={true} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PokemonBattle
