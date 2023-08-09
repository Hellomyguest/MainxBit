import React, { SetStateAction } from 'react';

export enum Themes {
	DEFAULT = 'default',
	DARK = 'dark',
}

export type ContextType = {
	user: {
		value: string | undefined;
		setValue: React.Dispatch<SetStateAction<undefined>>;
	};
	theme: {
		value: string | undefined;
		setValue: React.Dispatch<SetStateAction<Themes>>;
	};
};
