import { useContext, useRef } from 'react';
import styles from './page.module.css';
import { MainBlock, InfoBlock, ReferralBlock, WhyUsBlock } from './ui';
import { Context } from '../../shared/store/ContextProvider';
import { AboutBlock } from './ui/AboutBlock/AboutBlock';
import { TeamBlock } from './ui/TeamBlock/TeamBlock';
import { MapBlock } from './ui/MapBlock/MapBlock';
import { DocsBlock } from './ui/DocsBlock/DocsBlock';

export const MainPage = () => {
	const context = useContext(Context);
	const mainBlockRef = useRef<HTMLDivElement>(null);

	return (
		<div className={styles._}>
			<MainBlock ref={mainBlockRef}/>
			{context?.user?.value && (
				<div className={styles.wrapper}>
					<InfoBlock />
					<ReferralBlock />
					<WhyUsBlock />
					<AboutBlock />
					<TeamBlock />
					<MapBlock />
					<DocsBlock />
				</div>
			)}
		</div>
	);
};
