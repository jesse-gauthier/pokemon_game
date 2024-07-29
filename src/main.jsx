import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DebugProvider } from './utilities/DebugContext'

ReactDOM.createRoot(document.getElementById('root')).render(
	<DebugProvider>
		<App />
	</DebugProvider>
)
