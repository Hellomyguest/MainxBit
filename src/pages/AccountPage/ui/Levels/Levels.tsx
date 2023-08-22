import { useContext } from 'react';
import clsx from 'clsx';
import styles from './Levels.module.css';
import { Context } from '../../../../shared/store/ContextProvider';

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

const levels = [
	'Количество ваших рефералов',
	'Количество приобретенных ими токенов',
	'Ваше партнерское вознаграждение (10%)',
];

export const Levels = () => {
	const context = useContext(Context);

	return (
		<div className={styles._}>
			<div>
				<div className={clsx(styles.titleWrapper, styles.titleWrapper_first)}>
					10% первый уровень
				</div>
				<div className={styles.levels}>
					{levels.map((level) => (
						<LevelCard
							key={'firstLevel' + level}
							text={level}
							count={999}
							className={clsx({
								[styles.levelCard_dark]: !context?.theme?.value,
							})}
						/>
					))}
				</div>
			</div>
			<div>
				<div className={clsx(styles.titleWrapper, styles.titleWrapper_second)}>
					5% первый уровень
				</div>
				<div className={styles.levels}>
					{levels.map((level) => (
						<LevelCard
							key={'secondLevel' + level}
							text={level}
							count={999}
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
