import { InView } from 'react-intersection-observer';
import { ReactComponent as Security } from './lib/security.svg';
import { ReactComponent as Token } from './lib/token.svg';
import styles from './AboutBlock.module.css';
import { Col, Row } from 'antd';
import clsx from 'clsx';

export const AboutBlock = () => {
	return (
		<div className={styles._}>
			<div className={styles.confidence}>
				<div className={styles.description}>
					<InView>
						{({ inView, ref }) => (
							<h2
								className={clsx(styles.title, {
									[styles.title_visible]: inView,
								})}
								ref={ref}
							>
								О доверии
							</h2>
						)}
					</InView>
					<span className={styles.text}>
						Наша команда постоянно работает над улучшением и развитием биржи,
						что обеспечивает стабильный и высокий уровень доходности для
						держателей AMB токенов. Мы уверены, что наша крипто биржа mainxbit
						станет лидером на рынке, а вы сможете получать значительные
						дивиденды благодаря умному выбору вложений в AMB токены.
						Присоединяйтесь к нам и станьте частью инновационного проекта,
						который обещает большое будущее!
						<br />
						<br /> Присоединяйтесь к нам и станьте частью инновационного
						проекта, который обещает большое будущее!
					</span>
				</div>
				<Security />
			</div>
			<div className={styles.numbers}>
				<InView>
					{({ inView, ref }) => (
						<h2
							ref={ref}
							className={clsx(styles.title, { [styles.title_visible]: inView })}
							style={{ textAlign: 'center', marginBottom: '50px' }}
						>
							О цифрах
						</h2>
					)}
				</InView>
				<div className={styles.statistic}>
					<h2
						className={clsx(styles.title, styles.title_visible)}
						style={{ marginBottom: '25px' }}
					>
						MainX Bit
					</h2>
					<span className={styles.stat}>0.25 USD</span>
					<Row gutter={[8, 34]} className={styles.grid}>
						<Col span={12}>
							<span className={styles.param}>Выпущено</span>
						</Col>
						<Col span={12}>
							<span className={styles.stat}>25,000,000 AMB</span>
						</Col>

						<Col span={12}>
							<span className={styles.param}>Дивиденды</span>
						</Col>
						<Col span={12}>
							<span className={styles.stat}>10 - 35%</span>
						</Col>
					</Row>
				</div>
				<Token className={styles.token} />
			</div>
		</div>
	);
};
