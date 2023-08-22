import { InView } from 'react-intersection-observer';
import { Carousel } from 'antd';
import { ReactComponent as Tick } from './lib/Tick.svg';
import { ReactComponent as ArrowLeft } from './lib/ArrowLeft.svg';
import { ReactComponent as ArrowRight } from './lib/ArrowRight.svg';
import { ReactComponent as Faq } from './lib/faq.svg';
import { ReactComponent as TreeStory } from './lib/treeStory.svg';
import { ReactComponent as NetLeft } from './lib/netLeft.svg';
import { ReactComponent as NetRight } from './lib/netRight.svg';
import { Tree3, Tree4 } from '../../../../shared/ui/PageLayout/lib';
import styles from './WhyUsBlock.module.css';
import clsx from 'clsx';

const reasons = [
	'Безопасность',
	'Надежность',
	'Производительность',
	'Совладение',
	'Реферальная программа',
];

const benefits = [
	'Мобильное приложение, доступное как для пользователей Android, так и iOS.',
	'Маржинальная торговля с ордерами S/L T/P и кредитным плечом.',
	'Агрегатор ликвидности, включая Binance.',
	'Модуль добавления токенов ERC20, BEP20, TRC20.',
	'Интеграция фиатных валют USD, EUR, RUB.',
	'Реферальная программа для дополнительного заработка.',
	'Производительность биржи свыше 100 000 транзакций в секунду.',
	'Повышенная безопасность, чтобы вы могли не переживать о своих средствах.',
	'Модуль P2P и OTK для безопасных и удобных сделок.',
	'Стартовая площадка для размещения IEO проектов.',
	'Спот-торговля на основных криптовалютных парах.',
];

const Reason = ({ children }: { children: string }) => (
	<div className={styles.reason}>
		<Tick className={styles.tick} />
		{children}
	</div>
);

const Benefit = ({ children }: { children: string }) => (
	<div className={styles.benefit}>
		<span>{children}</span>
	</div>
);

const ArrowLeftComponent = ({
	currentSlide,
	slideCount,
	...props
}: {
	currentSlide?: number;
	slideCount?: number;
}) => (
	<ArrowLeft
		aria-disabled={currentSlide === 0 || !slideCount ? true : false}
		{...props}
	/>
);
const ArrowRightComponent = ({
	currentSlide,
	slideCount,
	...props
}: {
	currentSlide?: number;
	slideCount?: number;
}) => (
	<ArrowRight
		aria-disabled={currentSlide === slideCount! - 1 ? true : false}
		{...props}
	/>
);

export const WhyUsBlock = () => {
	return (
		<div className={styles._}>
			<NetLeft className={clsx(styles.net, styles.net_left)} />
			<NetRight className={clsx(styles.net, styles.net_right)} />
			<div className={styles.container}>
				<InView>
					{({ inView, ref }) => (
						<h2
							ref={ref}
							className={clsx(styles.title, {
								[styles.title_visible]: inView,
							})}
						>
							Почему мы?
						</h2>
					)}
				</InView>
				<div className={styles.reasons}>
					{reasons.map((item) => (
						<Reason key={item}>{item}</Reason>
					))}
				</div>
				<div className={styles.carousel}>
					<Carousel
						arrows
						prevArrow={<ArrowLeftComponent />}
						nextArrow={<ArrowRightComponent />}
						autoplay
					>
						{benefits.map((item) => (
							<Benefit key={item}>{item}</Benefit>
						))}
					</Carousel>
				</div>
				<Faq className={styles.faq} />
				<div className={styles.trees}>
					<TreeStory />
					<Tree3 className={styles.tree} />
					<Tree4 className={styles.tree} />
				</div>
			</div>
		</div>
	);
};
