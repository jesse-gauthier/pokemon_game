/* eslint-disable react/prop-types */
const BattleCard = ({ pokemon }) => {
	return (
		<div className='card border-[#FFCC5C] border-[13px] w-96 shadow-xl'>
			<figure className='p-4'>
				<img
					src={pokemon.sprites.other.dream_world.front_default}
					alt='Shoes'
				/>
			</figure>
			<div className='card-body mx-auto'>
				<h2 className='text-3xl card-title text-center capitalize'>
					{pokemon.name}
				</h2>
			</div>
		</div>
	)
}

export default BattleCard
