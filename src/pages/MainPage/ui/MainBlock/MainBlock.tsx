import { useContext } from 'react';
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
import { Context } from '../../../../shared/store/ContextProvider';
import { Button } from '../../../../shared/ui/Button/Button';
import { DropdownMenu } from './ui/DropdownMenu/DropdownMenu';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const MainBlock = ({
	ref,
}: {
	ref: React.LegacyRef<HTMLDivElement>;
}) => {
	const progress = 25;
	const context = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className={styles._} ref={ref}>
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
					{context?.user?.value ? (
						<DropdownMenu
							firstButton={{
								icon: <UserOutlined />,
								onClick: () => {
									navigate('/account');
								},
							}}
						/>
					) : (
						/* <div className={styles.themeWrapper}>
								<Button type="icon" onClick={() => {}}>
									<MenuIcon />
								</Button>
								<Button
									type="icon"
									onClick={() => context?.theme?.setValue(Themes.DARK)}
								>
									{context?.theme?.value ? (
										<MoonIcon className={styles.icon} />
									) : (
										<MoonIcon_light className={styles.icon} />
									)}
								</Button>
								/
								<Button
									type="icon"
									onClick={() => context?.theme?.setValue(Themes.LIGHT)}
								>
									{context?.theme?.value ? (
										<SunIcon className={styles.icon} />
									) : (
										<SunIcon_light className={styles.icon} />
									)}
								</Button>
							</div> */
						<Button onClick={() => context?.user.setValue('aaa')}>Войти</Button>
					)}
					<LogoIcon className={styles.logoIcon} />
				</div>
			</div>
			<Mountain className={styles.mountain} />
			<Mountain1 className={styles.mountain} />
			<Mountain2 className={styles.mountain} />
			<Bear className={styles.bear} />
			<Bird className={styles.bird} />
			<Bird1 className={styles.bird1} />
			<Bird2 className={styles.bird2} />
			<Bird3 className={styles.bird3} />
		</div>
	);
};
