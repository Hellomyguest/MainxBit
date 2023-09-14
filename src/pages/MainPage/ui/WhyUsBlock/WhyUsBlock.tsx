import { InView } from 'react-intersection-observer';
import { Carousel } from 'antd';
import { useTranslation } from 'react-i18next';
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
import { useResize } from '../../../../shared/utils/useResize';
import { useStore } from '../../../../shared/store/ContextProvider';

const Reason = ({ children }: { children: string }) => (
	<div className={styles.reason}>
		<Tick className={styles.tick} />
		{children}
	</div>
);

const Benefit = ({
	children,
	isDark,
}: {
	children: string;
	isDark: boolean;
}) => (
	<div className={clsx(styles.benefit, { [styles.benefit_dark]: isDark })}>
		{children}
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
	const { isScreenMd } = useResize();
	const { t, i18n } = useTranslation();
	const context = useStore();

	const reasons = [
		t('whyUs.reasons.1'),
		t('whyUs.reasons.2'),
		t('whyUs.reasons.3'),
		t('whyUs.reasons.4'),
		t('whyUs.reasons.5'),
	];

	return (
		<div className={styles._}>
			{isScreenMd && <NetLeft className={clsx(styles.net, styles.net_left)} />}
			{isScreenMd && (
				<NetRight className={clsx(styles.net, styles.net_right)} />
			)}
			<div className={styles.container}>
				<InView>
					{({ inView, ref }) => (
						<h2
							ref={ref}
							className={clsx(styles.title, {
								[styles.title_visible]: inView,
							})}
						>
							{t('whyUs.title')}
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
						/* autoplay */
					>
						{context?.sliderText?.map((item) => (
							<Benefit key={item.id} isDark={!context?.theme?.value}>
								{i18n.language === 'en' ? item.text_EN : item.text_RU}
							</Benefit>
						))}
					</Carousel>
				</div>
				<Faq className={styles.faq} />
				<div className={styles.trees}>
					<TreeStory className={styles.treeStory} />
					<Tree3 className={styles.tree} />
					<Tree4 className={styles.tree} />
				</div>
			</div>
		</div>
	);
};
