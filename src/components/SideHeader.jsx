/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { DebugContext } from '../utilities/DebugContext'
import DebugToggle from '../utilities/DebugToggle'

const clearLocalStorage = () => {
	localStorage.removeItem('pokemonData')
	localStorage.removeItem('pokemonTimestamp')
}

const SideHeader = () => {
	const { isDebugMode } = useContext(DebugContext)

	return (
		<div className='w-[15%] h-screen bg-red-200'>
			<DebugToggle />
			<header>
				{isDebugMode && (
					<div className='flex flex-col gap-3'>
						<button
							onClick={clearLocalStorage}
							className='btn btn-md ml-auto rounded-r-none'
						>
							Clear Wild Pokemon
						</button>
						<button
							onClick={clearLocalStorage}
							className='btn btn-md ml-auto rounded-r-none'
						>
							Clear Caught Pokemon
						</button>
					</div>
				)}
				<h1 className='text-center text-3xl font-bold my-8'>Pokemon App</h1>
				<nav>
					<ul className='flex flex-col'>
						<li className='flex flex-wrap gap-y-3 justify-end py-2'>
							<Link className='btn w-[90%] rounded-r-none' to='/'>
								Wild Pokemon
							</Link>
							<Link className='btn w-[90%] rounded-r-none' to='/caught_pokemon'>
								Caught Pokemon
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	)
}

export default SideHeader
