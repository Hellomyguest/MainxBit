import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { ethers } from 'ethers';
import Cookies from 'js-cookie';
import styles from './Account.module.css';
import { ReactComponent as Logo } from './lib/Logo.svg';
import { ReactComponent as Logo_light } from './lib/Logo_light.svg';
import clsx from 'clsx';
import { Button } from '../../../../shared/ui/Button/Button';
import { Tooltip } from 'antd';
import { useStore } from '../../../../shared/store/ContextProvider';
import { formatAddress } from '../../../../shared/store/utils';
import {
	CONTRACT_ABI,
	CONTRACT_ADDRESS,
	CONTRACT_APPROVE_ABI,
	CONTRACT_APPROVE_ADDRESS,
} from '../../../../shared/store/CONTRACT';
import { CloseCircleOutlined } from '@ant-design/icons';

export const Account = () => {
	const context = useStore();
	const { t } = useTranslation();
	const [modal, contextHolder] = Modal.useModal();
	const [inputValue, setInputValue] = useState<string>('');
	const [price, setPrice] = useState<number>();
	const [isApproved, setApproved] = useState(false);
	const isLogedIn = !!context?.MetaMask?.wallet.accounts.length;

	const buyToken = async () => {
		if (inputValue && +inputValue > 0) {
			try {
				const ref = Cookies.get('ref');
				const provider = new ethers.BrowserProvider(window.ethereum);
				const signer = window.ethereum && (await provider.getSigner());
				const contract = new ethers.Contract(
					CONTRACT_ADDRESS,
					CONTRACT_ABI,
					signer
				);
				const response = ref
					? await contract?.buyToken(ethers.toBigInt(+inputValue), ref)
					: await contract?.buyToken(ethers.toBigInt(+inputValue));
				console.log(response);
				setApproved(false);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				modal.error({
					title: error.reason,
					icon: <CloseCircleOutlined />,
					okText: 'Вернуться',
				});
			}
		}
	};

	const approve = async () => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = window.ethereum && (await provider.getSigner());
			const approveContract = new ethers.Contract(
				CONTRACT_APPROVE_ADDRESS,
				CONTRACT_APPROVE_ABI,
				signer
			);

			const approve = await approveContract?.approve(
				CONTRACT_ADDRESS,
				ethers.toBigInt(+inputValue * 25)
			);
			console.log(approve);
			setApproved(true);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			modal.error({
				title: error.reason,
				icon: <CloseCircleOutlined />,
				okText: 'Вернуться',
			});
		}
	};

	useEffect(() => {
		try {
			const getPrice = async () => {
				const provider = new ethers.BrowserProvider(window.ethereum);
				const signer = window.ethereum && (await provider.getSigner());
				const contract = new ethers.Contract(
					CONTRACT_ADDRESS,
					CONTRACT_ABI,
					signer
				);
				const response = await contract?.price();
				if (response) {
					setPrice(Number(response) * 0.001);
				}
			};
			getPrice();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			modal.error({
				title: error.reason,
				icon: <CloseCircleOutlined />,
				okText: 'Вернуться',
			});
		}
	}, []);

	return (
		<div className={clsx(styles._, { [styles.dark]: !context?.theme?.value })}>
			{contextHolder}
			{context?.theme?.value ? <Logo_light /> : <Logo />}
			<Tooltip placement="bottom" title={context?.MetaMask?.wallet.accounts[0]}>
				<span>
					{isLogedIn && formatAddress(context?.MetaMask?.wallet.accounts[0])}
				</span>
			</Tooltip>
			<div className={styles.wallet}>
				<h3 className={styles.wallet__title}>{t('account.title')}</h3>
				<span className={styles.wallet__balance}>{t('account.balance')}</span>
				<span
					className={styles.wallet__balance_amount}
				>{`${context?.MetaMask?.wallet.balance} AMB`}</span>
				<div className={styles.wallet__buy}>
					<div className={styles.buy__title}>
						<span className={styles.wallet__balance}>{t('account.buy')}</span>
						<span className={styles.buy__amount}>
							{price && `1AMB = ${price} USD`}
						</span>
					</div>
					<div className={styles.inputWrapper}>
						<input
							type="number"
							min={0}
							onChange={(e) => {
								setInputValue(e.currentTarget.value);
							}}
							value={inputValue}
							placeholder="Токен (BSC - BEP20)"
							className={styles.buy__input}
						/>
						<div className={styles.input__tag}>
							<span className={styles.tag__text}>AMB</span>
						</div>
					</div>
					<span className={styles.currenceAmount}>
						{price && `${(+(inputValue || 0) * price).toFixed(2)} USD`}
					</span>
					<Button
						onClick={isApproved ? buyToken : approve}
						className={styles.button}
					>
						{isApproved ? t('account.buy') : t('account.approve')}
					</Button>
				</div>
				<a>{t('account.help')}</a>
			</div>
		</div>
	);
};
