import { useState, useEffect } from 'react';
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

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
const approveContract = new ethers.Contract(
	CONTRACT_APPROVE_ADDRESS,
	CONTRACT_APPROVE_ABI,
	signer
);
export const Account = () => {
	const context = useStore();
	const [inputValue, setInputValue] = useState<string>('');
	const [price, setPrice] = useState<number>();
	const [isApproved, setApproved] = useState(false);
	const isLogedIn = !!context?.MetaMask?.wallet.accounts.length;

	const buyToken = async () => {
		if (inputValue && +inputValue > 0) {
			try {
				const ref = Cookies.get('ref');

				const response = ref
					? await contract.buyToken(ethers.toBigInt(+inputValue), ref)
					: await contract.buyToken(ethers.toBigInt(+inputValue));
				console.log(response);
				setApproved(false);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const approve = async () => {
		try {
			const approve = await approveContract.approve(
				CONTRACT_ADDRESS,
				ethers.toBigInt(+inputValue * 25)
			);
			console.log(approve);
			setApproved(true);
		} catch (error) {
			console.log('rejected');
		}
	};

	useEffect(() => {
		const getPrice = async () => {
			const response = await contract.price();
			if (response) {
				setPrice(Number(response) * 0.001);
			}
		};
		getPrice();
	}, []);

	return (
		<div className={clsx(styles._, { [styles.dark]: !context?.theme?.value })}>
			{context?.theme?.value ? <Logo_light /> : <Logo />}
			<Tooltip placement="bottom" title={context?.MetaMask?.wallet.accounts[0]}>
				<span>
					{isLogedIn && formatAddress(context?.MetaMask?.wallet.accounts[0])}
				</span>
			</Tooltip>
			<div className={styles.wallet}>
				<h3 className={styles.wallet__title}>Мой кошелек</h3>
				<span className={styles.wallet__balance}>Баланс: </span>
				<span
					className={styles.wallet__balance_amount}
				>{`${context?.MetaMask?.wallet.balance} AMB`}</span>
				<div className={styles.wallet__buy}>
					<div className={styles.buy__title}>
						<span className={styles.wallet__balance}>Купить токен</span>
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
						{isApproved ? 'Купить токен' : 'Подтвердить'}
					</Button>
				</div>
				<a>Написать в техподдержку</a>
			</div>
		</div>
	);
};
