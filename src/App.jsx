// src/App.jsx

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'

import Home from './pages/Home'
import CaughtPokemon from './pages/CaughtPokemon'
import SideHeader from './components/SideHeader'
import PokemonDetails from './pages/PokemonDetails'
import BattleStagging from './pages/BattleStagging'
import ActiveBattle from './pages/ActiveBattle'

const App = () => {
	return (
		<Router>
			<div className='flex'>
				<SideHeader />
				<div className='flex-1 px-8 h-screen overflow-scroll'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/caught_pokemon' element={<CaughtPokemon />} />
						<Route path='/battle/:id' element={<BattleStagging />} />
						<Route
							path='/battlegrounds/:attackid/:defendid'
							element={<ActiveBattle />}
						/>

						<Route path='/pokemon/:id' element={<PokemonDetails />} />
						<Route path='*' element={<Navigate to='/' replace />} />
					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App
