import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './context/store'

import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'
import User from './pages/User.tsx'

const router = createBrowserRouter([
	{ path: '/', element: <Home /> },
	{ path: '/users/:id', element: <User /> },
	{ path: "*", element: <NotFound /> }
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
)
