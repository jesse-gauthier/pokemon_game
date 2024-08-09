import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BattleCard from '../components/Battle_System/BattleCard'

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
				console.log('Matched attacking Pokemon:', matchedPokemon)
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
				console.log('Matched defend Pokemon:', matchedPokemon)
				setDefend(matchedPokemon)
			} else {
				console.log('No defend Pokemon found with the given defendId')
			}
		} else {
			console.log('No caughtPokemon found or the data is not an array')
		}
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
				<div>{defend && <BattleCard pokemon={defend} />}</div>
			</div>
		</div>
	)
}

export default ActiveBattle
