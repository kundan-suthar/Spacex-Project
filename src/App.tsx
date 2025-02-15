import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import './App.scss';
import { HeaderMegaMenu } from './components/Header';
import FooterPage from './components/Footer';

export default function App() {
	const { pathname } = useLocation();
	 // Define routes that should NOT have header and footer
	 const noLayoutRoutes = ["/sign-in", "/sign-up"];

	 const hideLayout = noLayoutRoutes.includes(pathname);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
			 {!hideLayout && <HeaderMegaMenu />}
			
			<Outlet />
			{!hideLayout && <FooterPage />}
		</MantineProvider>
	);
}
