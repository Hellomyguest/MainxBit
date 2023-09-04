import styles from './ProgressBar.module.css';

export const ProgressBar = ({ bought, total }: { bought: number, total: number }) => {
	const progress = total / (bought || 1)
	return (
		<div className={styles._}>
			<div
				className={styles.line}
				style={{ width: `${progress}%` }}
			/>
			<span className={styles.percent}>{`${progress.toFixed(2)}%`}</span>
			<div className={styles.total}>{total}</div>
		</div>
	);
};
