import { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { Button } from '../../../../../../shared/ui/Button/Button';
import { MenuIcon, MenuIcon_light, MoonIcon, SunIcon } from '../../lib';
import styles from './DropdownMenu.module.css';
import { Context } from '../../../../../../shared/store/ContextProvider';
import clsx from 'clsx';
import { Tooltip } from 'antd';
import { Themes } from '../../../../../../shared/store/types';
import { useTranslation } from 'react-i18next';

type Props = {
	firstButton?: {
		icon: React.ReactNode;
		onClick: () => void;
		tooltip: string;
	};
};

export const DropdownMenu = ({ firstButton }: Props) => {
	const { t, i18n } = useTranslation();
	const handleChange = useCallback(
		() => i18n.changeLanguage(i18n.language === 'ru-RU' ? 'en' : 'ru-RU'),
		[i18n]
	);

	const [isOpen, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const context = useContext(Context);
	const isLight = context?.theme?.value;

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
				isOpen &&
				!containerRef?.current?.contains(e.target as HTMLDivElement)
			) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, setOpen]);

	return (
		<div
			ref={containerRef}
			className={clsx(styles._, { [styles.open]: isOpen })}
		>
			<Button className={styles.button} onClick={() => setOpen(!isOpen)}>
				{isLight ? <MenuIcon_light /> : <MenuIcon />}
			</Button>

			<div className={styles.dropdown}>
				{firstButton && (
					<Button className={styles.button} onClick={firstButton?.onClick}>
						<Tooltip placement="left" title={firstButton.tooltip}>
							{firstButton?.icon}
						</Tooltip>
					</Button>
				)}

				<Button className={styles.button} onClick={handleChange}>
					<Tooltip
						placement="left"
						title={t('dropdown.language')}
						className={styles.button__text}
					>
						{i18n.language === 'ru-RU' ? 'En' : 'Рус'}
					</Tooltip>
				</Button>

				<Button
					className={styles.button}
					onClick={() => {
						context?.theme?.setValue(isLight ? Themes.DARK : Themes.LIGHT);
					}}
				>
					<Tooltip
						placement="left"
						title={isLight ? t('dropdown.dark') : t('dropdown.light')}
					>
						{isLight ? (
							<MoonIcon className={styles.icon} />
						) : (
							<SunIcon className={styles.icon} />
						)}
					</Tooltip>
				</Button>
			</div>
		</div>
	);
};
