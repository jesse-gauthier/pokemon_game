import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import CaughtPokemon from './pages/CaughtPokemon'
import SideHeader from './components/SideHeader'

const App = () => {
	return (
		<Router>
			<div className='flex'>
				<SideHeader />
				<div className='flex-1 px-8 h-screen overflow-scroll'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/caught_pokemon' element={<CaughtPokemon />} />
					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App
