import React, { useState } from 'react';
import { ContextType } from './types';

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const Context = React.createContext<ContextType | null>(null);

export const ContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [user, setUser] = useState<string | undefined>();
	const [isLight, setLigth] = useState(!defaultDark);

	function toggleTheme(themeColor: string) {
		if (themeColor === 'dark') {
			document.body.style.setProperty('--primary-background-color', ' #1b1b1b');
			document.body.style.setProperty('--primary-button-color', ' #222222');
			document.body.style.setProperty('color', ' #f7f7f7');
			document.body.style.setProperty('--primary-text-color', ' #f7f7f7');
			setLigth(false);
		} else if (themeColor === 'light') {
			document.body.style.setProperty('--primary-background-color', ' white');
			document.body.style.setProperty('--primary-button-color', ' #f7f7f7');
			document.body.style.setProperty('color', '#222222');
			document.body.style.setProperty('--primary-text-color', ' #222222');
			setLigth(true);
		}
	}

	const store = {
		user: { value: user, setValue: setUser },
		theme: { value: isLight, setValue: toggleTheme },
	};

	return <Context.Provider value={store}>{children}</Context.Provider>;
};
