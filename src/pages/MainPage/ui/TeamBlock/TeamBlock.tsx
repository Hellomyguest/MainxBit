import { InView } from 'react-intersection-observer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TeamBlock.module.css';
import clsx from 'clsx';
import { Button } from '../../../../shared/ui/Button/Button';

const Card = () => <div className={styles.card} />;

const cards = [1, 2, 3, 4, 5, 6, 7, 8];

export const TeamBlock = () => {
	const [isOpen, setOpen] = useState(false);
	const { t } = useTranslation();

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
						{cards.map((item) => (
							<Card key={item} />
						))}
					</div>
					<Button
						type="text"
						onClick={() => setOpen(!isOpen)}
						className={styles.button}
					>
						{isOpen ? t('team.hide') : t('team.view')}
					</Button>
				</div>
			</div>
		</div>
	);
};
