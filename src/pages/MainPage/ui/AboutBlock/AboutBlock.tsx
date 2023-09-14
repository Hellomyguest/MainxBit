import { InView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Security } from './lib/security.svg';
import { ReactComponent as Token } from './lib/token.svg';
import styles from './AboutBlock.module.css';
import { Col, Row } from 'antd';
import clsx from 'clsx';
import { useResize } from '../../../../shared/utils/useResize';
import { useStore } from '../../../../shared/store/ContextProvider';

export const AboutBlock = () => {
	const { isScreenMd, isScreenSm } = useResize();
	const { t, i18n } = useTranslation();
	const context = useStore();
	return (
		<div className={styles._}>
			<div className={styles.container}>
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
									{t('about.title')}
								</h2>
							)}
						</InView>
						<span className={styles.text}>
							{i18n.language === 'en' ? context?.texts?.text4_EN: context?.texts?.text4_RU}
							<br />
							<br /> {t('about.text1')}
						</span>
					</div>
					<Security className={styles.security} />
				</div>
				<div className={styles.numbers}>
					<InView>
						{({ inView, ref }) => (
							<h2
								ref={ref}
								className={clsx(styles.title, {
									[styles.title_visible]: inView,
								})}
								style={{
									textAlign: 'center',
									marginBottom: isScreenMd ? '50px' : 0,
								}}
							>
								{t('about.numbers')}
							</h2>
						)}
					</InView>
					<div className={styles.statistic}>
						<div className={styles.titleWrap}>
							<h2
								className={clsx(styles.title, styles.title_visible)}
								style={{ marginBottom: isScreenMd ? '25px' : 0 }}
							>
								MainX Bit
							</h2>

							<span
								className={styles.stat}
							>{`${context?.stat?.price} USD`}</span>
						</div>
						<Row gutter={[8, isScreenSm ? 34 : 18]} className={styles.grid}>
							<Col span={12}>
								<span className={styles.param}>{t('about.released')}</span>
							</Col>
							<Col span={12}>
								<span
									className={styles.stat}
								>{`${context?.stat?.totalToken} AMB`}</span>
							</Col>

							<Col span={12}>
								<span className={styles.param}>{t('about.dividends')}</span>
							</Col>
							<Col span={12}>
								<span className={styles.stat}>10 - 35%</span>
							</Col>
						</Row>
					</div>
					<Token className={styles.token} />
				</div>
			</div>
		</div>
	);
};
