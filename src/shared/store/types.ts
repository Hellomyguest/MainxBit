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
		white_paper_RU: string;
		white_paper_EN: string;
		one_pager_RU: string;
		one_pager_EN: string;
		contract_offer_RU: string;
		contract_offer_EN: string;
		privacy_policy_RU: string;
		privacy_policy_EN: string;
	};
	stat: {
		totalUsers: number;
		price: string;
		totalToken: number;
		tokenBought: number;
	};
	team: Array<{
		id?: number;
		name?: string;
		job?: string;
		photo?: string;
		link_instagram?: string | null;
		link_telegram?: string | null;
		link_twitter?: string | null;
	}>;
	faq: Array<{
		id: number;
		question_RU: string;
		question_EN: string;
		answer_RU: string;
		answer_EN: string;
	}>;
	sliderText: Array<{
		id: number;
		text_RU: string;
		text_EN: string;
	}>;
	texts: {
		text1_RU: string;
		text1_EN: string;
		text2_RU: string;
		text2_EN: string;
		text3_RU: string;
		text3_EN: string;
		text4_RU: string;
		text4_EN: string;
		text5_RU: string;
		text5_EN: string;
		ref_text1_RU: string;
		ref_text1_EN: string;
		ref_text2_RU: string;
		ref_text2_EN: string;
		ref_text3_RU: string;
		ref_text3_EN: string;
	};
	ethereum: unknown
};
