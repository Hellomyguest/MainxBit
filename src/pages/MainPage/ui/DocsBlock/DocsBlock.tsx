import { InView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Document } from './lib/document.svg';
import { ReactComponent as Moon } from './lib/moon.svg';
import styles from './DocsBlock.module.css';
import { Button } from '../../../../shared/ui/Button/Button';
import clsx from 'clsx';
import { useResize } from '../../../../shared/utils/useResize';

export const DocsBlock = () => {
	const { isScreenMd, isScreenLg } = useResize();
	const { t } = useTranslation();
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
						{t('docs.text')}
					</span>
					<div className={styles.buttonWrapper}>
						<Button className={styles.button} onClick={() => {}}>
							White paper
						</Button>
						<Button className={styles.button} onClick={() => {}}>
							One pager
						</Button>
					</div>
				</div>
				{isScreenLg && <Moon className={styles.moon} />}
			</div>
		</div>
	);
};
