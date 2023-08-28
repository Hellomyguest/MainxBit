import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from 'antd';
import styles from './PageLayout.module.css';
import {
	InstagramIcon,
	Logo,
	QR,
	TelegramIcon,
	Tree,
	Tree1,
	Tree2,
	Tree3,
	Tree4,
	TwitterIcon,
} from './lib';
import { useResize } from '../../utils/useResize';

const { Content, Footer } = Layout;

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
	const { isScreenSm, isScreenLg } = useResize();
	const { t } = useTranslation();
	return (
		<Layout className={styles._}>
			<Content>{children}</Content>
			<Footer className={styles.footer}>
				<div className={styles.container}>
					{isScreenLg && (
						<div className={styles.footer__logoWrapper}>
							<Logo />
							<div className={styles.socialMedia}>
								<TelegramIcon />
								<InstagramIcon />
								<TwitterIcon />
							</div>
						</div>
					)}

					<div className={styles.documents}>
						{!isScreenLg && (
							<>
								<Logo className={styles.logo} />
								<div className={styles.socialMedia}>
									<TelegramIcon />
									<InstagramIcon />
									<TwitterIcon />
								</div>
							</>
						)}
						{isScreenLg && (
							<div className={styles.documents__trees}>
								<Tree />
								<Tree1 />
								<Tree2 />
								<Tree3 />
								<Tree4 />
							</div>
						)}
						<div className={styles.documents__links}>
							<a href="#" className={styles.link}>
								{t('footer.contract')}
							</a>
							<a href="#" className={styles.link}>
								{t('footer.rules')}
							</a>
						</div>
						{!isScreenSm && (
							<div className={styles.qr}>
								<QR />
								<span className={styles.qr__text}>Launchpad</span>
							</div>
						)}
					</div>

					{isScreenSm && (
						<div className={styles.qr}>
							<QR />
							<span className={styles.qr__text}>Launchpad</span>
						</div>
					)}
				</div>
			</Footer>
		</Layout>
	);
};
