import React from 'react';
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
import { useStore } from '../../store/ContextProvider';

const { Content, Footer } = Layout;

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
	const context = useStore();
	return (
		<Layout className={styles._}>
			<Content>{children}</Content>
			{context?.MetaMask?.wallet.accounts.length && (
				<Footer className={styles.footer}>
					<div className={styles.footer__logoWrapper}>
						<Logo />
						<div className={styles.socialMedia}>
							<TelegramIcon />
							<InstagramIcon />
							<TwitterIcon />
						</div>
					</div>
					<div className={styles.documents}>
						<div className={styles.documents__trees}>
							<Tree />
							<Tree1 />
							<Tree2 />
							<Tree3 />
							<Tree4 />
						</div>

						<div className={styles.documents__links}>
							<a href="#" className={styles.link}>
								Договор оферты
							</a>
							<a href="#" className={styles.link}>
								Правила конфиденциальности
							</a>
						</div>
					</div>
					<div className={styles.qr}>
						<QR />
						<span className={styles.qr__text}>Launchpad</span>
					</div>
				</Footer>
			)}
		</Layout>
	);
};
