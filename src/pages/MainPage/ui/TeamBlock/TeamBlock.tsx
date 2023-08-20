import { useState } from 'react';
import styles from './TeamBlock.module.css';
import clsx from 'clsx';
import { Button } from '../../../../shared/ui/Button/Button';

const Card = () => <div className={styles.card} />;

const cards = [1, 2, 3, 4, 5, 6, 7, 8];

export const TeamBlock = () => {
	const [isOpen, setOpen] = useState(false);

	return (
		<div className={styles._}>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>Наша команда</h2>
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
					{isOpen ? 'Скрыть' : 'Посмотреть все'}
				</Button>
			</div>
		</div>
	);
};
