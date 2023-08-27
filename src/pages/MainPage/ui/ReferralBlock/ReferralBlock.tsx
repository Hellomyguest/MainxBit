import { InView } from 'react-intersection-observer';
import { ReactComponent as Deal } from './lib/deal.svg';
import styles from './ReferralBlock.module.css';
import clsx from 'clsx';
import { useResize } from '../../../../shared/utils/useResize';

const Card = ({ children }: { children: string }) => (
	<div className={styles.card}>
		<span>{children}</span>
	</div>
);

export const ReferralBlock = () => {
	const { isScreenMd } = useResize();
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
							Реферальная программа
						</h2>
					)}
				</InView>
				<div className={styles.container}>
					{isScreenMd && <Deal />}
					<div className={styles.cardsWrapper}>
						<span className={styles.text}>
							Часть токенов можно приобрести бесплатно, за счет приглашения
							друзей к участию.
						</span>
						<div className={styles.cards}>
							<Card>10% первый уровень</Card>
							<Card>5% второй уровень</Card>
							{!isScreenMd && <Deal />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
