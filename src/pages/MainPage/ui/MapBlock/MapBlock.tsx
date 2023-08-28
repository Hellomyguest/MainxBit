import { InView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ReactComponent as Map_dark } from './lib/map_dark.svg';
import { ReactComponent as Map_light } from './lib/map_light.svg';
import { ReactComponent as Map_small_dark } from './lib/map_small_dark.svg';
import { ReactComponent as Map_small_light } from './lib/map_small_light.svg';
import { ReactComponent as Map_dark_en } from './lib/Map_dark_en.svg';
import { ReactComponent as Map_light_en } from './lib/Map_en.svg';
import { ReactComponent as Map_small_dark_en } from './lib/Map_small_dark_en.svg';
import { ReactComponent as Map_small_light_en } from './lib/Map_small_en.svg';
import styles from './MapBlock.module.css';
import { Context } from '../../../../shared/store/ContextProvider';
import clsx from 'clsx';
import { useResize } from '../../../../shared/utils/useResize';

export const MapBlock = () => {
	const context = useContext(Context);
	const { isScreenMd } = useResize();
	const { i18n, t } = useTranslation();
	return (
		<div className={styles._}>
			<div className={styles.container}>
				<InView>
					{({ inView, ref }) => (
						<h2
							ref={ref}
							className={clsx(styles.title, {
								[styles.title_visible]: inView,
							})}
						>
							{t('map.title')}
						</h2>
					)}
				</InView>
				{context?.theme?.value ? (
					isScreenMd ? (
						i18n.language === 'ru-RU' ? (
							<Map_light className={styles.map} />
						) : (
							<Map_light_en className={styles.map} />
						)
					) : i18n.language === 'ru-RU' ? (
						<Map_small_light className={styles.map} />
					) : (
						<Map_small_light_en className={styles.map} />
					)
				) : isScreenMd ? (
					i18n.language === 'ru-RU' ? (
						<Map_dark className={styles.map} />
					) : (
						<Map_dark_en className={styles.map} />
					)
				) : i18n.language === 'ru-RU' ? (
					<Map_small_dark className={styles.map} />
				) : (
					<Map_small_dark_en className={styles.map} />
				)}
			</div>
		</div>
	);
};
