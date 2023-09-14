import { InView } from 'react-intersection-observer';
import styles from './FaqBlock.module.css';
import clsx from 'clsx';
import { Button } from 'antd';
import { useState } from 'react';
import { useStore } from '../../../../shared/store/ContextProvider';
import { useTranslation } from 'react-i18next';

const FaqCard = ({
	title,
	text,
	index,
}: {
	title: string;
	text: string;
	index: number;
}) => {
	const [isOpen, setOpen] = useState(false);
	return (
		<div className={clsx(styles.faqCard, { [styles.faqCard_open]: isOpen })}>
			<div className={styles.faqCard__header}>
				<div style={{ display: 'flex' }}>
					<span className={styles.faqCard__title}>{`${index + 1}.`}</span>
					<span className={styles.faqCard__title}>{title}</span>
				</div>
				<Button
					type="text"
					icon={
						<div className={styles.faqCard__plus}>
							<div className={styles.faqCard__horizontal} />
							{!isOpen && <div className={styles.faqCard__vertical} />}
						</div>
					}
					className={styles.faqCard__button}
					onClick={() => setOpen(!isOpen)}
				/>
			</div>
			{isOpen && <div className={styles.faqCard__text}>{text}</div>}
		</div>
	);
};

export const FaqBlock = () => {
	const context = useStore();
	const { i18n } = useTranslation();
	return (
		<div className={styles._}>
			<div className={styles.wrapper}>
				<InView>
					{({ inView, ref }) => (
						<h2
							ref={ref}
							className={clsx(styles.title, {
								[styles.title_visible]: inView,
							})}
						>
							FAQ
						</h2>
					)}
				</InView>
				<div className={styles.cardsWrapper}>
					{context?.faq.map((item, index) => (
						<FaqCard
							title={
								i18n.language === 'en' ? item.question_EN : item.question_RU
							}
							text={i18n.language === 'en' ? item.answer_EN : item.answer_RU}
							index={index}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
