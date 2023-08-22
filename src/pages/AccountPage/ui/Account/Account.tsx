import { useState } from 'react';
import styles from './Account.module.css';
import { ReactComponent as Logo } from './lib/Logo.svg';
import { ReactComponent as Logo_light } from './lib/Logo_light.svg';
import clsx from 'clsx';
import { Button } from '../../../../shared/ui/Button/Button';
import { Tooltip } from 'antd';
import { useStore } from '../../../../shared/store/ContextProvider';
import { formatAddress } from '../../../../shared/store/utils';

export const Account = () => {
	const context = useStore();
	const [inputValue, setInputValue] = useState('');
	const isLogedIn = !!context?.MetaMask?.wallet.accounts.length;

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
						<span className={styles.buy__amount}>1AMB = 0,25 USD</span>
					</div>
					<div className={styles.inputWrapper}>
						<input
							type="number"
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
						{`${(+inputValue * 0.25).toFixed(2)} USD`}
					</span>
					<Button onClick={() => {}} className={styles.button}>
						Купить токен
					</Button>
				</div>
				<a>Написать в техподдержку</a>
			</div>
		</div>
	);
};
