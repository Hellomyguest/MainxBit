import { useState, useRef, useEffect } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { DropdownMenu } from '../MainPage/ui/MainBlock/ui/DropdownMenu/DropdownMenu';
import styles from './page.module.css';
import { Account } from './ui/Account/Account';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/ui/Button/Button';
import { ReferralMessage } from './ui/ReferralMessage/ReferralMessage';
import { Levels } from './ui/Levels/Levels';
import { useStore } from '../../shared/store/ContextProvider';
import { Empty } from 'antd';
import clsx from 'clsx';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../shared/store/CONTRACT';
import { ethers } from 'ethers';
import { useResize } from '../../shared/utils/useResize';
import { Logo, Logo_light } from '../MainPage/ui/MainBlock/lib';

const provider = new ethers.BrowserProvider(window.ethereum);
// const signer = await provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

export const AccountPage = () => {
	const context = useStore();
	const { isScreenMd } = useResize();
	const refText = 'http://project7546596.tilda.ws/3';
	const navigate = useNavigate();
	const [isNotificationShown, setNotificationShown] = useState(false);

	const referralRef = useRef<HTMLSpanElement | null>(null);
	const handleClickCopy = () => {
		setNotificationShown(true);
		navigator.clipboard.writeText(referralRef?.current?.textContent || '');
		setTimeout(() => setNotificationShown(false), 1000);
	};

	useEffect(() => {
		const getReferals = async () => {
			const response = await contract.getReferals();
			console.log(response);
			console.log(Object.entries(response));
		};
		getReferals();
	}, []);

	return context?.MetaMask?.wallet?.accounts.length ? (
		<div className={styles._}>
			<div className={styles.wrapper}>
				{isScreenMd && <Account />}
				<div className={styles.content}>
					<div className={styles.header}>
						{isScreenMd ? (
							<span className={styles.lastEnter}>
								Время последнего входа - 2023-04-24 20:58:11
							</span>
						) : context?.theme?.value ? (
							<Logo_light className={styles.content__logo} />
						) : (
							<Logo className={styles.content__logo} />
						)}
						<div>
							<DropdownMenu
								firstButton={{
									icon: <HomeOutlined />,
									onClick: () => navigate('/'),
									tooltip: 'Главная страница',
								}}
							/>
						</div>
					</div>
					{!isScreenMd && <Account />}
					<div className={styles.referral}>
						<h3 className={styles.referral__title}>Реферальная программа</h3>
						<div className={styles.referral__wrapper}>
							<span
								ref={referralRef}
								className={clsx(styles.referral__text, {
									[styles.referral__text_light]: context?.theme?.value,
								})}
							>
								{isNotificationShown ? 'Скопировано' : refText}
							</span>
							<Button
								onClick={handleClickCopy}
								className={styles.referral__button}
							>
								COPY
							</Button>
						</div>
					</div>
					<ReferralMessage refText={refText} />
					<Levels />
				</div>
			</div>
		</div>
	) : (
		<Empty
			description={
				<span>
					Пройдите авторизацию <a href="/">Главная страница</a>
				</span>
			}
		/>
	);
};
