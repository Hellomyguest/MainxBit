import styles from './ProgressBar.module.css';

export const ProgressBar = ({ progress }: { progress: number }) => {
	return (
		<div className={styles._}>
			<div
				className={styles.line}
				style={{ width: `${progress}%` }}
			/>
			<span className={styles.percent}>{`${progress}%`}</span>
			<div className={styles.total}>1.500.000</div>
		</div>
	);
};
