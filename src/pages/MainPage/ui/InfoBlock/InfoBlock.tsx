import { ReactComponent as Graph } from './lib/Graph.svg';
import { ReactComponent as Logo } from './lib/logo.svg';
import { ReactComponent as Investor } from './lib/investor.svg';
import styles from './InfoBlock.module.css';

export const InfoBlock = () => {

	return (
		<div className={styles._}>
			<div className={styles.info__content}>
				<Logo />
				<span className={styles.info__text}>
					Хотите стать участником проекта, который имеет огромный потенциал для
					развития и становления на рынке криптовалют? Тогда вам обязательно
					стоит обратить внимание на наши доле распределительные токены AMB,
					которые дают право на получение ежемесячного дохода от монетизации
					криптобиржи!
				</span>
				<Investor />
			</div>
			<Graph className={styles.info__graph} />
		</div>
	);
};