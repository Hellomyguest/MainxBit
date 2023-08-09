import { useContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider, Layout, theme } from 'antd';
import { Themes, ContextType } from './shared/store/types.ts';
import { Context, ContextProvider } from './shared/store/ContextProvider';
import { AccountPage, MainPage } from './pages/index.ts';
import './App.css';

const {Content, Footer} = Layout;

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
	const context = useContext(Context) as ContextType;
	return (
		<ContextProvider>
			<ConfigProvider
				theme={{
					algorithm:
						context?.theme?.value === Themes.DARK
							? theme.darkAlgorithm
							: theme.defaultAlgorithm,
				}}
			>
				<Layout>
					<Content>
						<RouterProvider router={router} />
					</Content>
					<Footer >Footer</Footer>
				</Layout>
			</ConfigProvider>
		</ContextProvider>
	);
};
