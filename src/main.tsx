import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/landing/Landing';
import Launches from './pages/Launches/Launches';
import {ClerkProvider} from '@clerk/clerk-react'
import ProtectedRoute from './auth/ProtectedRoutes';
import SignInPage from './auth/SignIn';
import Rockets from './pages/rockets/Rockets';
import SingleRocket from './pages/rockets/SingleRocket';
import Dragon from './pages/dragon/Dragon';
import SingleDragon from './pages/dragon/SingleDragon';
import Starlink from './pages/starlink/Starlink';
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

export const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Landing />
			},
			{ path: "/sign-in", element: <SignInPage /> }, // Public Route
			
			{
				path: "/Launches",
				element: <ProtectedRoute />, // Protect this route
				children: [{ path: "/Launches", element: <Launches /> }],
			},
			{
				path: "/rockets",
				element: <ProtectedRoute />, // Protect this route
				children: [{ path: "/rockets", element: <Rockets /> },
					{ path: "/rockets/:id", element: <SingleRocket /> },
				],
			},
			{
				path: "/dragons",
				element: <ProtectedRoute />, // Protect this route
				children: [{ path: "/dragons", element: <Dragon /> },
					{ path: "/dragons/:id", element: <SingleDragon /> },
				],
			},
			{
				path: "/starlink",
				element: <ProtectedRoute />, // Protect this route
				children: [{ path: "/starlink", element: <Starlink /> },
				],
			},
		]
	}
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
		</ClerkProvider>
	</StrictMode>
);
