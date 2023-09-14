import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './page.module.css';
import { MainBlock, InfoBlock, ReferralBlock, WhyUsBlock } from './ui';
import { AboutBlock } from './ui/AboutBlock/AboutBlock';
import { TeamBlock } from './ui/TeamBlock/TeamBlock';
import { MapBlock } from './ui/MapBlock/MapBlock';
import { DocsBlock } from './ui/DocsBlock/DocsBlock';
import { useSearchParams } from 'react-router-dom';
import { FaqBlock } from './ui/FaqBlock/FaqBlock';

export const MainPage = () => {
	const [searchParams] = useSearchParams();
	const [isGoingDown, setGoingDown] = useState(true);

	useEffect(() => {
		const cookieRef = Cookies.get('ref');
		if (cookieRef === undefined) {
			const ref = searchParams.get('ref');
			if (ref) Cookies.set('ref', ref);
		}
	});

	return (
		<div className={styles._}>
			<MainBlock isGoingDown={isGoingDown} setGoingDown={setGoingDown} />
			<div className={styles.wrapper}>
				<InfoBlock isGoingDown={isGoingDown} setGoingDown={setGoingDown} />
				<ReferralBlock />
				<WhyUsBlock />
				<AboutBlock />
				<TeamBlock />
				<MapBlock />
				<DocsBlock />
				<FaqBlock/>
			</div>
		</div>
	);
};
