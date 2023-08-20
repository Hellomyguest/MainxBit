import { ReactComponent as Deal } from './lib/deal.svg';
import styles from './ReferralBlock.module.css';

const Card = ({ children }: { children: string }) => (
	<div className={styles.card}>
		<span>{children}</span>
	</div>
);

export const ReferralBlock = () => {
	return (
		<div className={styles._}>
			<h2 className={styles.title}>Реферальная программа</h2>
			<div className={styles.container}>
				<Deal />
				<div className={styles.cardsWrapper}>
					<span className={styles.text}>
						Часть токенов можно приобрести бесплатно, за счет приглашения друзей
						к участию.
					</span>
					<div className={styles.cards}>
						<Card>10% первый уровень</Card>
						<Card>5% второй уровень</Card>
					</div>
				</div>
			</div>
		</div>
	);
};
