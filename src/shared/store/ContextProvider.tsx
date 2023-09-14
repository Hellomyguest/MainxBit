import React, { useState, useCallback, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { ContextType, WalletState } from './types';
import { formatBalance } from './utils';
import detectEthereumProvider from '@metamask/detect-provider';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import MetaMaskSDK, { SDKProvider } from '@metamask/sdk';

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const disconnectedState: WalletState = {
	accounts: [],
	balance: '',
	chainId: '',
};

export const Context = React.createContext<ContextType | null>(null);

export const ContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [ethereum, setEthereum] = useState<SDKProvider>();

	useEffect(() => {}, []);

	const storedTheme = Cookies.get('theme');
	const [isLight, setLigth] = useState(
		storedTheme ? storedTheme === 'light' : !defaultDark
	);
	const [modal, contextHolder] = Modal.useModal();
	const { t } = useTranslation();

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
		Cookies.set('theme', themeColor);
	}

	useEffect(() => {
		toggleTheme(isLight ? 'light' : 'dark');
	}, []);

	const [hasProvider, setHasProvider] = useState<boolean | null>(null);

	const [isConnecting, setIsConnecting] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');
	const clearError = () => setErrorMessage('');

	const [wallet, setWallet] = useState(disconnectedState);

	const _updateWallet = useCallback(async (providedAccounts?: string[]) => {
		const accounts =
			providedAccounts ||
			(await window.ethereum.request({ method: 'eth_accounts' }));

		if (accounts.length === 0) {
			setWallet(disconnectedState);
			return;
		}

		const balance = formatBalance(
			await window.ethereum.request({
				method: 'eth_getBalance',
				params: [accounts[0], 'latest'],
			})
		);
		const chainId = await window.ethereum.request({
			method: 'eth_chainId',
		});

		setWallet({ accounts, balance, chainId });
	}, []);

	const updateWalletAndAccounts = useCallback(
		() => _updateWallet(),
		[_updateWallet]
	);
	const updateWallet = useCallback(
		(accounts: string[]) => _updateWallet(accounts),
		[_updateWallet]
	);

	useEffect(() => {
		const getProvider = async () => {
			const provider = await detectEthereumProvider({ silent: true });
			setHasProvider(Boolean(provider));

			if (provider) {
				updateWalletAndAccounts();
				window.ethereum.on('accountsChanged', updateWallet);
				window.ethereum.on('chainChanged', updateWalletAndAccounts);
			} else {
				const MMSDK = new MetaMaskSDK({
					useDeeplink: false,
					dappMetadata: {
						name: 'MainxBit',
						url: 'https://mainxbit.com/',
					},
				});
				MMSDK.init()
					.then(() => {
						const ethereum = MMSDK.getProvider();
						setEthereum(ethereum);
					})
			}
		};

		getProvider();

		return () => {
			window.ethereum?.removeListener('accountsChanged', updateWallet);
			window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts);
		};
	}, [updateWallet, updateWalletAndAccounts, ethereum]);

	const connectMetaMask = async () => {
		setIsConnecting(true);

		try {
			const accounts = await (ethereum? ethereum : window.ethereum).request({
				method: 'eth_requestAccounts',
			});
			clearError();
			updateWallet(accounts);
			modal.warning({
				title: t('modal.signed'),
				icon: <CheckCircleOutlined />,
				okText: 'Вернуться',
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setErrorMessage(err.message);
			modal.error({
				title: err.message,
				icon: <CloseCircleOutlined />,
				okText: 'Вернуться',
			});
		}
		setIsConnecting(false);
	};

	useEffect(() => {
		return () => {
			if (wallet?.accounts?.[0]) {
				const date = new Date();
				const dateString = `${date.getFullYear()}-${`${
					date.getMonth() + 1
				}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(
					2,
					'0'
				)} ${`${date.getHours()}`.padStart(
					2,
					'0'
				)}:${`${date.getMinutes()}`.padStart(
					2,
					'0'
				)}:${`${date.getSeconds()}`.padStart(2, '0')}`;
				Cookies.set('lastEnter', dateString);
			}
		};
	}, []);

	const [siteInfo, setSiteInfo] = useState({
		contract_offer: '',
		link_instagram: '',
		link_telegram: '',
		link_tiktok: '',
		link_twitter: '',
		one_pager: '',
		white_paper_RU: '',
		white_paper_EN: '',
		one_pager_RU: '',
		one_pager_EN: '',
		contract_offer_RU: '',
		contract_offer_EN: '',
		privacy_policy_RU: '',
		privacy_policy_EN: '',
	});

	useEffect(() => {
		const getInfo = async () => {
			const response = await fetch('https://api.mainxbit.com/get_info');
			const parsed = await response.json();
			setSiteInfo(parsed.result);
		};
		getInfo();
	}, []);

	const [stat, setStat] = useState({
		totalUsers: 0,
		price: '0,00',
		totalToken: 0,
		tokenBought: 0,
	});

	useEffect(() => {
		const getStat = async () => {
			const response = await fetch('https://api.mainxbit.com/get_statistics');
			const parsed = await response.json();

			setStat({
				totalUsers: parsed?.result?.[0] || 0,
				price: (parsed?.result?.[1] / 1000 || 0).toFixed(2),
				totalToken: parsed?.result?.[2] || 0,
				tokenBought: parsed?.result?.[3] || 0,
			});
		};
		getStat();
	}, []);

	const [team, setTeam] = useState([]);

	useEffect(() => {
		const getTeam = async () => {
			const response = await fetch('https://api.mainxbit.com/get_commands');
			const parsed = await response.json();

			setTeam(parsed.result);
		};
		getTeam();
	}, []);

	const [faq, setFaq] = useState<
		Array<{
			id: number;
			question_RU: string;
			question_EN: string;
			answer_RU: string;
			answer_EN: string;
		}>
	>([]);

	useEffect(() => {
		const getFaq = async () => {
			const response = await fetch('https://api.mainxbit.com/get_faq');
			const parsed = await response.json();

			setFaq(parsed.result);
		};
		getFaq();
	}, []);

	const [sliderText, setSliderText] = useState([]);

	useEffect(() => {
		const getSliderText = async () => {
			const response = await fetch('https://api.mainxbit.com/get_carousel');
			const parsed = await response.json();

			setSliderText(parsed.result);
		};
		getSliderText();
	}, []);

	const [texts, setTexts] = useState({
		text1_RU: '',
		text1_EN: '',
		text2_RU: '',
		text2_EN: '',
		text3_RU: '',
		text3_EN: '',
		text4_RU: '',
		text4_EN: '',
		text5_RU: '',
		text5_EN: '',
		ref_text1_RU: '',
		ref_text1_EN: '',
		ref_text2_RU: '',
		ref_text2_EN: '',
		ref_text3_RU: '',
		ref_text3_EN: '',
	});

	useEffect(() => {
		const getTexts = async () => {
			const response = await fetch('https://api.mainxbit.com/get_text');
			const parsed = await response.json();

			setTexts(parsed.result);
		};
		getTexts();
	}, []);

	const store = {
		theme: { value: isLight, setValue: toggleTheme },
		MetaMask: {
			wallet,
			hasProvider,
			error: !!errorMessage,
			errorMessage,
			isConnecting,
			connectMetaMask,
			clearError,
		},
		links: siteInfo,
		stat,
		team,
		faq,
		sliderText,
		texts,
		ethereum,
	};

	return (
		<Context.Provider value={store}>
			{contextHolder}
			{children}
		</Context.Provider>
	);
};

export const useStore = () => {
	const context = useContext(Context);
	if (context === undefined) {
		throw new Error(
			'useMetaMask must be used within a "MetaMaskContextProvider"'
		);
	}
	return context;
};
