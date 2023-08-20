import { useContext } from 'react';
import { ReactComponent as Map_dark } from './lib/map_dark.svg';
import { ReactComponent as Map_light } from './lib/map_light.svg';
import styles from './MapBlock.module.css';
import { Context } from '../../../../shared/store/ContextProvider';

export const MapBlock = () => {
	const context = useContext(Context);

	return (
		<div className={styles._}>
			<h2 className={styles.title}>Карта развития</h2>
			{context?.theme?.value ? <Map_light /> : <Map_dark />}
		</div>
	);
};
