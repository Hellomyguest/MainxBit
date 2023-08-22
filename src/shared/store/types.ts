export enum Themes {
	DARK = 'dark',
	LIGHT = 'light',
}

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ethereum?: any;
	}
}

export type WalletState = {
	accounts: string[];
	balance: string;
	chainId: string;
};

export type ContextType = {
	theme: { value: boolean; setValue: (theme: Themes) => void };
	MetaMask: {
		wallet: WalletState;
		hasProvider: boolean | null;
		error: boolean;
		errorMessage: string;
		isConnecting: boolean;
		connectMetaMask: () => void;
		clearError: () => void;
	};
};
