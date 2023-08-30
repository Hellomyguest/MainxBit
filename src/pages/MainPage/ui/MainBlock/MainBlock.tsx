/* eslint-disable no-mixed-spaces-and-tabs */
import { useTranslation } from 'react-i18next';
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
	Moon_small,
	Moon_small1,
	Moon_small2,
	Mountain_small,
	Mountain_small2,
	Mountain_small1,
} from './lib';
import { ProgressBar } from './ui/ProgressBar/ProgressBar';
import { useStore } from '../../../../shared/store/ContextProvider';
import { Button } from '../../../../shared/ui/Button/Button';
import { DropdownMenu } from '../../../../shared/ui/DropdownMenu/DropdownMenu';
import {
	UserOutlined,
	LoginOutlined,
	CloseCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import { useResize } from '../../../../shared/utils/useResize';
import { Modal } from 'antd';

export const MainBlock = ({
	isGoingDown,
	setGoingDown,
}: {
	isGoingDown: boolean;
	setGoingDown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const progress = 25;
	const [modal, contextHolder] = Modal.useModal();
	const { t } = useTranslation();
	const { isScreenSm, isScreenMd, isScreenLg } = useResize();
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

	const signIn = () => {
		context?.MetaMask?.hasProvider && window.ethereum?.isMetaMask
			? context?.MetaMask?.connectMetaMask()
			: modal.error({
					title: (
						<a href="https://metamask.io" target="_blank">
							{t('modal.install')}
						</a>
					),
					icon: <CloseCircleOutlined />,
					okText: 'Ок',
			  });
	};

	return (
		<div ref={ref} className={styles._}>
			{contextHolder}
			{isScreenMd ? (
				<Moon className={styles.moon} />
			) : (
				<Moon_small className={styles.moon} />
			)}
			{isScreenMd ? (
				<Moon1 className={styles.moon} />
			) : (
				<Moon_small1 className={styles.moon} />
			)}
			{isScreenMd ? (
				<Moon2 className={styles.moon} />
			) : (
				<Moon_small2 className={styles.moon} />
			)}
			<div className={styles.content}>
				<header className={styles.header}>
					{context?.theme?.value ? (
						<Logo_light className={styles.content__logo} />
					) : (
						<Logo className={styles.content__logo} />
					)}

					<div>
						<DropdownMenu
							firstButton={
								context?.MetaMask.wallet?.accounts.length
									? {
											icon: <UserOutlined />,
											onClick: () => {
												navigate('/account');
											},
											tooltip: t('dropdown.account'),
									  }
									: {
											icon: <LoginOutlined />,
											onClick: signIn,
											tooltip: t('dropdown.signIn'),
									  }
							}
						/>
					</div>
				</header>
				<div className={styles.wrapper}>
					<div className={styles.content__leftSide}>
						{!isScreenMd && (
							<>
								<h3 className={styles.bar__title}>{t('main.sold')}</h3>
								<ProgressBar progress={progress} />
								<h3 className={styles.bar__title}>{t('main.total')}</h3>
								<div className={styles.bar__total}>5000</div>
								<LogoIcon className={styles.logoIcon} />
							</>
						)}
						<div style={{ display: 'flex' }}>
							<div className={styles.textWrap}>
								<h1 className={styles.content__title}>MainX Bit</h1>
								<span className={styles.content__text}>{t('main.text')}</span>
								<Button
									onClick={() => {
										context?.MetaMask.wallet?.accounts.length
											? navigate('/account')
											: signIn();
									}}
								>
									{t('main.buy')}
								</Button>
							</div>
							{!isScreenLg && isScreenMd && (
								<LogoIcon className={styles.logoIcon} />
							)}
						</div>
						{isScreenMd && (
							<div className={styles.content__bar}>
								<div>
									<h3 className={styles.bar__title}>{t('main.sold')}</h3>
									<ProgressBar progress={progress} />
								</div>
								<div>
									<h3 className={styles.bar__title}>{t('main.total')}</h3>
									<div className={styles.bar__total}>5000</div>
								</div>
							</div>
						)}
					</div>
					{isScreenLg && <LogoIcon className={styles.logoIcon} />}
				</div>
			</div>
			{isScreenSm ? (
				<Mountain
					className={clsx(styles.mountain, { [styles.mountain_up]: !inView })}
				/>
			) : (
				<Mountain_small
					className={clsx(styles.mountain, { [styles.mountain_up]: !inView })}
				/>
			)}
			{isScreenSm ? (
				<Mountain1
					className={clsx(styles.mountain, { [styles.mountain_up]: !inView })}
				/>
			) : (
				<Mountain_small1
					className={clsx(styles.mountain, { [styles.mountain_up]: !inView })}
				/>
			)}
			{isScreenSm ? (
				<Mountain2
					className={clsx(styles.mountain, { [styles.mountain_up]: !inView })}
				/>
			) : (
				<Mountain_small2
					className={clsx(styles.mountain, { [styles.mountain_up]: !inView })}
				/>
			)}
			<Bear className={styles.bear} />
			<Bird className={clsx(styles.birds, styles.bird)} />
			<Bird1 className={clsx(styles.birds, styles.bird1)} />
			<Bird2 className={clsx(styles.birds, styles.bird2)} />
			<Bird3 className={clsx(styles.birds, styles.bird3)} />
		</div>
	);
};
