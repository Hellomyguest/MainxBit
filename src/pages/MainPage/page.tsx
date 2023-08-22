import { useContext, useState } from 'react';
import styles from './page.module.css';
import { MainBlock, InfoBlock, ReferralBlock, WhyUsBlock } from './ui';
import { Context } from '../../shared/store/ContextProvider';
import { AboutBlock } from './ui/AboutBlock/AboutBlock';
import { TeamBlock } from './ui/TeamBlock/TeamBlock';
import { MapBlock } from './ui/MapBlock/MapBlock';
import { DocsBlock } from './ui/DocsBlock/DocsBlock';

export const MainPage = () => {
	const context = useContext(Context);
	const [isGoingDown, setGoingDown] = useState(true);

	return (
		<div className={styles._}>
			<MainBlock isGoingDown={isGoingDown} setGoingDown={setGoingDown} />
			{context?.MetaMask?.wallet.accounts.length && (
				<div className={styles.wrapper}>
					<InfoBlock isGoingDown={isGoingDown} setGoingDown={setGoingDown} />
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
