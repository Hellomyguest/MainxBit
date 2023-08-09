import React, { useState } from 'react';
import { ContextType, Themes } from './types';

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const Context = React.createContext<ContextType | null>(null);

export const ContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [user, setUser] = useState();
	const [theme, setTheme] = useState(
		defaultDark ? Themes.DARK : Themes.DEFAULT
	);

	const store = {
		user: { value: user, setValue: setUser },
		theme: { value: theme, setValue: setTheme },
	};

	return <Context.Provider value={store}>{children}</Context.Provider>;
};
