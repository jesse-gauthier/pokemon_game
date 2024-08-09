import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BattleCard from '../components/Battle_System/BattleCard'
import fetchFromUrl from '../utilities/MovesFetch'

const ActiveBattle = () => {
	const [attack, setAttack] = useState(null)
	const [defend, setDefend] = useState(null)
	let { attackid, defendid } = useParams()

	// fetches local storage wildPokemon, filters to find matching pokemon by id
	const attackPokemon = (attackid) => {
		const wildPokemon = JSON.parse(localStorage.getItem('wildPokemon'))
		if (wildPokemon && Array.isArray(wildPokemon)) {
			const matchedPokemon = wildPokemon.find(
				(pokemon) => pokemon.id == attackid
			)
			if (matchedPokemon) {
				setAttack(matchedPokemon)
			} else {
				console.log('No attack Pokemon found with the given attackId')
			}
		} else {
			console.log('No wildPokemon found or the data is not an array')
		}
	}

	// fetches local storage caughtPokemon, filters to find matching pokemon by id
	const defendPokemon = (defendid) => {
		const caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon'))
		if (caughtPokemon && Array.isArray(caughtPokemon)) {
			const matchedPokemon = caughtPokemon.find(
				(pokemon) => pokemon.id == defendid
			)
			if (matchedPokemon) {
				setDefend(matchedPokemon)
			} else {
				console.log('No defend Pokemon found with the given defendId')
			}
		} else {
			console.log('No caughtPokemon found or the data is not an array')
		}
	}

	// Function to shuffle an array
	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	// useEffect to call the functions when attackid and defendid change
	useEffect(() => {
		if (attackid) {
			attackPokemon(attackid)
		}
		if (defendid) {
			defendPokemon(defendid)
		}
	}, [attackid, defendid])

	return (
		<div>
			<h1>Active Battle</h1>
			<div className='flex justify-between'>
				<div>{attack && <BattleCard pokemon={attack} />}</div>
				<div>
					{defend && <BattleCard pokemon={defend} />}
					<div className='sidebar'>
						<h3 className='text-center my-4 text-2xl'>Select Your Move</h3>
						<div className='grid grid-cols-4 gap-3'>
							{defend && defend.moves && defend.moves.length > 0 ? (
								shuffleArray(defend.moves)
									.slice(0, 5)
									.map((move, index) => (
										<button
											onClick={() => fetchFromUrl(move.url)}
											key={index}
											className='col-span-2 btn btn-success text-white'
										>
											{move.name}
										</button>
									))
							) : (
								<p>No moves available</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ActiveBattle
