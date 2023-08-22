import { InView } from 'react-intersection-observer';
import { useContext } from 'react';
import { ReactComponent as Map_dark } from './lib/map_dark.svg';
import { ReactComponent as Map_light } from './lib/map_light.svg';
import styles from './MapBlock.module.css';
import { Context } from '../../../../shared/store/ContextProvider';
import clsx from 'clsx';

export const MapBlock = () => {
	const context = useContext(Context);

	return (
		<div className={styles._}>
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
			{context?.theme?.value ? <Map_light /> : <Map_dark />}
		</div>
	);
};
