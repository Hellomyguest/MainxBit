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
	links: {
		contract_offer: string;
		link_instagram: string;
		link_telegram: string;
		link_tiktok: string;
		link_twitter: string;
		one_pager: string;
		privacy_policy: string;
		white_paper: string;
	};
	stat: {
		totalUsers: number;
		price: string;
		totalToken: number;
		tokenBought: number;
	};
};
