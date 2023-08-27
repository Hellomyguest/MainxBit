import { InView } from 'react-intersection-observer';
import { useContext } from 'react';
import { ReactComponent as Map_dark } from './lib/map_dark.svg';
import { ReactComponent as Map_light } from './lib/map_light.svg';
import { ReactComponent as Map_small_dark } from './lib/map_small_dark.svg';
import { ReactComponent as Map_small_light } from './lib/map_small_light.svg';
import styles from './MapBlock.module.css';
import { Context } from '../../../../shared/store/ContextProvider';
import clsx from 'clsx';
import { useResize } from '../../../../shared/utils/useResize';

export const MapBlock = () => {
	const context = useContext(Context);
	const { isScreenMd } = useResize();
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
							Карта развития
						</h2>
					)}
				</InView>
				{context?.theme?.value ? (
					isScreenMd ? (
						<Map_light className={styles.map} />
					) : (
						<Map_small_light className={styles.map} />
					)
				) : isScreenMd ? (
					<Map_dark className={styles.map} />
				) : (
					<Map_small_dark className={styles.map} />
				)}
			</div>
		</div>
	);
};
