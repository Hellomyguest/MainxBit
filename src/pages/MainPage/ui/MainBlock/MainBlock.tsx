import styles from './MainBlock.module.css';
import {
	Moon,
	Moon1,
	Moon2,
	Logo,
	LogoIcon,
	Mountain,
	Mountain1,
	Mountain2,
	Bear,
	Bird,
	Bird1,
	Bird2,
	Bird3,
	Logo_light,
} from './lib';
import { ProgressBar } from './ui/ProgressBar/ProgressBar';
import { useStore } from '../../../../shared/store/ContextProvider';
import { Button } from '../../../../shared/ui/Button/Button';
import { DropdownMenu } from './ui/DropdownMenu/DropdownMenu';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';

export const MainBlock = ({
	isGoingDown,
	setGoingDown,
}: {
	isGoingDown: boolean;
	setGoingDown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const progress = 25;
	const context = useStore();
	const navigate = useNavigate();
	const { ref, inView } = useInView({
		threshold: 0.2,
		onChange: (inView) => {
			if (inView && !isGoingDown) {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
				setGoingDown(!isGoingDown);
			}
		},
	});

	return (
		<div ref={ref} className={styles._}>
			<Moon className={styles.moon} />
			<Moon1 className={styles.moon} />
			<Moon2 className={styles.moon} />
			<div className={styles.content}>
				<div className={styles.content__leftSide}>
					{context?.theme?.value ? (
						<Logo_light className={styles.content__logo} />
					) : (
						<Logo className={styles.content__logo} />
					)}
					<h1 className={styles.content__title}>MainX Bit</h1>
					<span className={styles.content__text}>
						Купите доле распределительные токены AMB на предварительной продаже
						по цене $0,25 и получите доход в 14x на IEO!
					</span>
					<Button onClick={() => {}}>Купить</Button>
					<div className={styles.content__bar}>
						<div>
							<h3 className={styles.bar__title}>Токенов продано</h3>
							<ProgressBar progress={progress} />
						</div>
						<div>
							<h3 className={styles.bar__title}>Всего инвесторов</h3>
							<div className={styles.bar__total}>5000</div>
						</div>
					</div>
				</div>
				<div className={styles.content__rightSide}>
					{context?.MetaMask?.hasProvider && window.ethereum?.isMetaMask ? (
						context?.MetaMask?.wallet?.accounts.length ? (
							<DropdownMenu
								firstButton={{
									icon: <UserOutlined />,
									onClick: () => {
										navigate('/account');
									},
								}}
							/>
						) : (
							<Button onClick={() => context?.MetaMask?.connectMetaMask()}>
								Войти
							</Button>
						)
					) : (
						<a href="https://metamask.io" target="_blank">
							Install MetaMask
						</a>
					)}
					<LogoIcon className={styles.logoIcon} />
				</div>
			</div>
			<Mountain
				className={clsx(styles.mountain, { [styles.mountain_up]: !inView })}
			/>
			<Mountain1
				className={clsx(styles.mountain, { [styles.mountain_up]: !inView })}
			/>
			<Mountain2
				className={clsx(styles.mountain, { [styles.mountain_up]: !inView })}
			/>
			<Bear className={styles.bear} />
			<Bird className={styles.bird} />
			<Bird1 className={styles.bird1} />
			<Bird2 className={styles.bird2} />
			<Bird3 className={styles.bird3} />
		</div>
	);
};
