import React, { SetStateAction } from 'react';

export enum Themes {
	DARK = 'dark',
	LIGHT = 'light',
}

export type ContextType = {
	user: {
		value: string | undefined;
		setValue: React.Dispatch<SetStateAction<string | undefined>>;
	};
	theme: { value: boolean; setValue: (theme: Themes) => void };
};
