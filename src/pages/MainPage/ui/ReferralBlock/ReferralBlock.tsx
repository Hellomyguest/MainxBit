import { InView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Deal } from './lib/deal.svg';
import styles from './ReferralBlock.module.css';
import clsx from 'clsx';
import { useResize } from '../../../../shared/utils/useResize';
import { useStore } from '../../../../shared/store/ContextProvider';

const Card = ({ children }: { children: string }) => (
	<div className={styles.card}>
		<span>{children}</span>
	</div>
);

export const ReferralBlock = () => {
	const { isScreenMd } = useResize();
	const { t, i18n } = useTranslation();
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
							{t('referral.title')}
						</h2>
					)}
				</InView>
				<div className={styles.container}>
					{isScreenMd && <Deal />}
					<div className={styles.cardsWrapper}>
						<span className={styles.text}>
							{i18n.language === 'en'
								? context?.texts?.text3_EN
								: context?.texts?.text3_RU}
						</span>
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
