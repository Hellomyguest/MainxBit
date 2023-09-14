import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Layout } from 'antd';
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
	TikTokIcon,
} from './lib';
import { useResize } from '../../utils/useResize';
import { useStore } from '../../store/ContextProvider';

const { Content, Footer } = Layout;

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
	const { isScreenSm, isScreenLg } = useResize();
	const { t, i18n } = useTranslation();
	const context = useStore();

	return (
		<Layout className={styles._}>
			<Content>{children}</Content>
			<Footer className={styles.footer}>
				<div className={styles.container}>
					{isScreenLg && (
						<div className={styles.footer__logoWrapper}>
							<Logo />
							<div className={styles.socialMedia}>
								{context?.links?.link_telegram && (
									<Button
										type="link"
										icon={<TelegramIcon />}
										className={styles.link}
										href={context?.links?.link_telegram}
										target="_blank"
									/>
								)}
								{context?.links?.link_instagram && (
									<Button
										type="link"
										icon={<InstagramIcon />}
										className={styles.link}
										href={context?.links?.link_instagram}
										target="_blank"
									/>
								)}
								{context?.links?.link_twitter && (
									<Button
										type="link"
										icon={<TwitterIcon />}
										className={styles.link}
										href={context?.links?.link_twitter}
										target="_blank"
									/>
								)}
								{context?.links?.link_tiktok && (
									<Button
										type="link"
										icon={<TikTokIcon />}
										className={styles.link}
										href={context?.links?.link_tiktok}
										target="_blank"
									/>
								)}
							</div>
						</div>
					)}

					<div className={styles.documents}>
						{!isScreenLg && (
							<>
								<Logo className={styles.logo} />
								<div className={styles.socialMedia}>
									{context?.links?.link_telegram && (
										<Button
											type="link"
											icon={<TelegramIcon />}
											className={styles.link}
											href={context?.links?.link_telegram}
											target="_blank"
										/>
									)}
									{context?.links?.link_instagram && (
										<Button
											type="link"
											icon={<InstagramIcon />}
											className={styles.link}
											href={context?.links?.link_instagram}
											target="_blank"
										/>
									)}
									{context?.links?.link_twitter && (
										<Button
											type="link"
											icon={<TwitterIcon />}
											className={styles.link}
											href={context?.links?.link_twitter}
											target="_blank"
										/>
									)}
									{context?.links?.link_tiktok && (
										<Button
											type="link"
											icon={<TikTokIcon />}
											className={styles.link}
											href={context?.links?.link_tiktok}
											target="_blank"
										/>
									)}
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
							<a
								href={
									i18n.language === 'en'
										? context?.links?.contract_offer_EN
										: context?.links?.contract_offer_RU || '#'
								}
								target="_blank"
								className={styles.link}
							>
								{t('footer.contract')}
							</a>
							<a
								href={
									i18n.language === 'en'
										? context?.links?.privacy_policy_EN
										: context?.links?.privacy_policy_RU || '#'
								}
								target="_blank"
								className={styles.link}
							>
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
