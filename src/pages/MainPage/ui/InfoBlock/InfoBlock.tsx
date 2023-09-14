import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Graph } from './lib/Graph.svg';
import { ReactComponent as Logo } from './lib/logo.svg';
import { ReactComponent as Investor } from './lib/investor.svg';
import styles from './InfoBlock.module.css';
import { useStore } from '../../../../shared/store/ContextProvider';

export const InfoBlock = ({
	isGoingDown,
	setGoingDown,
}: {
	isGoingDown: boolean;
	setGoingDown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { ref } = useInView({
		threshold: 0.1,
		onChange: (inView, entry) => {
			if (inView && isGoingDown) {
				window.scrollTo({
					top: entry.intersectionRect.bottom,
					behavior: 'smooth',
				});
				setGoingDown(!isGoingDown);
			}
		},
	});
	const { i18n } = useTranslation();
	const context = useStore();

	return (
		<div ref={ref} className={styles._}>
			<div className={styles.info__content}>
				<Logo />
				<span className={styles.info__text}>{i18n.language === 'en' ? context?.texts?.text2_EN : context?.texts?.text2_RU}</span>
				<Investor className={styles.investor} />
			</div>
			<Graph className={styles.info__graph} />
		</div>
	);
};
