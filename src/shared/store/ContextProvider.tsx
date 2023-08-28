import React, { useState, useCallback, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { ContextType, WalletState } from './types';
import { formatBalance } from './utils';
import detectEthereumProvider from '@metamask/detect-provider';

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
			}
		};

		getProvider();

		return () => {
			window.ethereum?.removeListener('accountsChanged', updateWallet);
			window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts);
		};
	}, [updateWallet, updateWalletAndAccounts]);

	const connectMetaMask = async () => {
		setIsConnecting(true);

		try {
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});
			clearError();
			updateWallet(accounts);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setErrorMessage(err.message);
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
	};

	return <Context.Provider value={store}>{children}</Context.Provider>;
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
