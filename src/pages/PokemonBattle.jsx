import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import pokemonFetch from '../utilities/PokemonFetch'
import BattleCard from '../components/Battle_System/BattleCard'
import PokemonCard from '../components/PokemonCard'
import PokemonContainer from '../components/Battle_System/PokemonContainer'

const PokemonBattle = () => {
	const { id } = useParams()
	const [AttackPokemon, setPokemon] = useState(null)

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
					{/* Defend Pokemon */}
					<PokemonContainer />
				</div>
			</div>
		</div>
	)
}

export default PokemonBattle
