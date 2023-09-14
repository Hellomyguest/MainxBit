import { InView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Document } from './lib/document.svg';
import { ReactComponent as Moon } from './lib/moon.svg';
import styles from './DocsBlock.module.css';
import { Button } from '../../../../shared/ui/Button/Button';
import clsx from 'clsx';
import { useResize } from '../../../../shared/utils/useResize';
import { useStore } from '../../../../shared/store/ContextProvider';
import { useCallback } from 'react';

export const DocsBlock = () => {
	const { isScreenMd, isScreenLg } = useResize();
	const { t, i18n } = useTranslation();
	const context = useStore();

	const downloadWP = useCallback(() => {
		const link = document.createElement('a');

		link.href = `https://api.mainxbit.com/${
			i18n.language === 'en'
				? context?.links?.white_paper_EN
				: context?.links?.white_paper_RU
		}`;
		link.download = 'WhitePaper.conf';
		link.style.display = 'none';

		document.body.appendChild(link);

		link.click();

		document.body.removeChild(link);
	}, [
		context?.links?.white_paper_EN,
		context?.links?.white_paper_RU,
		i18n.language,
	]);

	const downloadOP = useCallback(() => {
		const link = document.createElement('a');

		link.href = `https://api.mainxbit.com/${
			i18n.language === 'en'
				? context?.links?.one_pager_EN
				: context?.links?.one_pager_RU
		}`;
		link.download = 'OnePager.pdf';
		link.style.display = 'none';

		document.body.appendChild(link);

		link.click();

		document.body.removeChild(link);
	}, [
		context?.links?.one_pager_EN,
		context?.links?.one_pager_RU,
		i18n.language,
	]);

	return (
		<div className={styles._}>
			<div className={styles.container}>
				{isScreenMd && <Document />}
				<div className={styles.content}>
					<InView>
						{({ inView, ref }) => (
							<h2
								ref={ref}
								className={clsx(styles.title, {
									[styles.title_visible]: inView,
								})}
							>
								{t('docs.title')}
							</h2>
						)}
					</InView>
					{!isScreenMd && <Document className={styles.document} />}
					<span className={styles.text}>
						{i18n.language === 'en'
							? context?.texts?.text5_EN
							: context?.texts?.text5_RU}
					</span>
					<div className={styles.buttonWrapper}>
						<Button className={styles.button} onClick={downloadWP}>
							White paper
						</Button>
						<Button className={styles.button} onClick={downloadOP}>
							One pager
						</Button>
					</div>
				</div>
				{isScreenLg && <Moon className={styles.moon} />}
			</div>
		</div>
	);
};
