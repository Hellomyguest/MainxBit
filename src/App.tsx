import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ContextProvider } from './shared/store/ContextProvider';
import { AccountPage, MainPage } from './pages/index.ts';
import './App.css';
import './antd-settings.css';
import { PageLayout } from './shared/ui/PageLayout/PageLayout.tsx';

const routes = [
	{
		path: '/',
		element: <MainPage />,
	},
	{
		path: '/account',
		element: <AccountPage />,
	},
];

const router = createBrowserRouter(routes);

export const App = () => {

	return (
		<ContextProvider>
				<PageLayout>
					<RouterProvider router={router} />
				</PageLayout>
		</ContextProvider>
	);
};
