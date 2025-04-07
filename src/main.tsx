import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
		<RouterProvider router={router} />
	</StrictMode>,
)
