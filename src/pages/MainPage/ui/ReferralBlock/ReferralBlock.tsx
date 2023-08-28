import { InView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
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
							{t('referral.title')}
						</h2>
					)}
				</InView>
				<div className={styles.container}>
					{isScreenMd && <Deal />}
					<div className={styles.cardsWrapper}>
						<span className={styles.text}>{t('referral.text')}</span>
						<div className={styles.cards}>
							<Card>{t('referral.firstLevel')}</Card>
							<Card>{t('referral.secondLevel')}</Card>
							{!isScreenMd && <Deal />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
