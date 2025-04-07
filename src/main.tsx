import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './context/store'

import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'
import User from './pages/User.tsx'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
const Layout = () => {
	return (
		<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Header />
			<main style={{ flex: 1 }}>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/users/:id', element: <User /> },
			{ path: "*", element: <NotFound /> }
		]
	}
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
)
