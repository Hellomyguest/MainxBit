import { InView } from 'react-intersection-observer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import styles from './TeamBlock.module.css';
import clsx from 'clsx';
import { Button as ButtonComp } from '../../../../shared/ui/Button/Button';
import { useStore } from '../../../../shared/store/ContextProvider';
import { ReactComponent as TelegramIcon } from './lib/TelegramIcon.svg';
import { ReactComponent as InstagramIcon } from './lib/InstagramIcon.svg';
import { ReactComponent as TwitterIcon } from './lib/TwitterIcon.svg';

type CardType = {
	name?: string;
	job?: string;
	photo?: string;
	link_instagram?: string | null;
	link_telegram?: string | null;
	link_twitter?: string | null;
};

const Card = ({
	photo,
	name,
	job,
	link_instagram,
	link_telegram,
	link_twitter,
}: CardType) => (
	<div
		className={styles.card}
		style={{ backgroundImage: `url("https://api.mainxbit.com/${photo}")` }}
	>
		<div className={styles.card__mask}>
			<span className={styles.card__text}>{name}</span>
			<span className={styles.card__text}>{job}</span>
			<div className={styles.card__iconWrapper}>
				{link_telegram && (
					<Button
					className={styles.card__button}
						type="text"
						href={link_telegram}
						icon={<TelegramIcon className={styles.card__icon}/>}
						target="_blank"
					/>
				)}
				{link_instagram && (
					<Button
					className={styles.card__button}
						type="text"
						href={link_instagram}
						icon={<InstagramIcon className={styles.card__icon}/>}
						target="_blank"
					/>
				)}
				{link_twitter && (
					<Button
					className={styles.card__button}
						type="text"
						href={link_twitter}
						icon={<TwitterIcon className={styles.card__icon}/>}
						target="_blank"
					/>
				)}
			</div>
		</div>
	</div>
);

export const TeamBlock = () => {
	const [isOpen, setOpen] = useState(false);
	const { t } = useTranslation();
	const context = useStore();

	return (
		<div className={styles._}>
			<div className={styles.wrapper}>
				<InView>
					{({ inView, ref }) => (
						<h2
							ref={ref}
							className={clsx(styles.title, {
								[styles.title_visible]: inView,
							})}
						>
							{t('team.title')}
						</h2>
					)}
				</InView>
				<div style={{ width: 'fit-content', marginInline: 'auto' }}>
					<div
						className={clsx(styles.gallery, { [styles.gallery_open]: isOpen })}
					>
						{context?.team?.map((worker) => (
							<Card
								key={worker?.id}
								photo={worker.photo}
								name={worker?.name}
								job={worker?.job}
								link_telegram={worker?.link_telegram}
								link_instagram={worker?.link_instagram}
								link_twitter={worker?.link_twitter}
							/>
						))}
						{/* {cards.map((item) => (
							<Card key={item} />
						))} */}
					</div>
					<ButtonComp
						type="text"
						onClick={() => setOpen(!isOpen)}
						className={styles.button}
					>
						{isOpen ? t('team.hide') : t('team.view')}
					</ButtonComp>
				</div>
			</div>
		</div>
	);
};
