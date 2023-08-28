import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import styles from './Levels.module.css';
import { Context } from '../../../../shared/store/ContextProvider';
import { ReferralsType } from '../../page';

const LevelCard = ({
	text,
	count,
	className,
}: {
	text: string;
	count: number;
	className?: string;
}) => {
	return (
		<div className={clsx(styles.levelCard, className)}>
			{text}
			<p className={styles.levelCard__count}>{count}</p>
		</div>
	);
};

export const Levels = ({ referrals }: { referrals?: ReferralsType }) => {
	const context = useContext(Context);
	const { t } = useTranslation();

	const levels = [t('levels.1'), t('levels.2'), t('levels.3')];

	const secondLevels = [t('levels.1'), t('levels.2'), t('levels.4')];

	return (
		<div className={styles._}>
			<div>
				<div className={clsx(styles.titleWrapper, styles.titleWrapper_first)}>
					{t('levels.first')}
				</div>
				<div className={styles.levels}>
					{levels.map((level, index) => (
						<LevelCard
							key={'firstLevel' + level}
							text={level}
							count={referrals?.firstLevel?.[index] || 0}
							className={clsx({
								[styles.levelCard_dark]: !context?.theme?.value,
							})}
						/>
					))}
				</div>
			</div>
			<div>
				<div className={clsx(styles.titleWrapper, styles.titleWrapper_second)}>
					{t('levels.second')}
				</div>
				<div className={styles.levels}>
					{secondLevels.map((level, index) => (
						<LevelCard
							key={'secondLevel' + level}
							text={level}
							count={referrals?.secondLevel?.[index] || 0}
							className={clsx({
								[styles.levelCard_dark]: !context?.theme?.value,
							})}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
