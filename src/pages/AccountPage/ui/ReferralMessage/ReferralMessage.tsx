import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import styles from './ReferralMessage.module.css';
import { Button } from '../../../../shared/ui/Button/Button';
import { SmsIcon, TelegramIcon, ViberIcon, WhatsupIcon } from './lib';
import { Context } from '../../../../shared/store/ContextProvider';

const ExampleCard = ({
	title,
	text,
	active,
	onClick,
}: {
	title: string;
	text: string;
	active?: boolean;
	onClick?: () => void;
}) => (
	<div
		className={clsx(styles.exampleCard, {
			[styles.exampleCard_active]: active,
		})}
		onClick={onClick}
	>
		<p className={styles.exampleCard__text}>{title}</p>
		<p className={styles.exampleCard__text}>{text}</p>
	</div>
);

export const ReferralMessage = ({ refText }: { refText: string }) => {
	const context = useContext(Context);
	const { t, i18n } = useTranslation();
	const [activeMessage, setActiveMessage] = useState({
		title: t('refMessage.1.title'),
		text:
			i18n.language === 'en'
				? context?.texts?.ref_text1_EN
				: context?.texts?.ref_text1_RU,
	});
	const [textAreaValue, setTextAreaValue] = useState(activeMessage.text);

	const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setTextAreaValue(e.target.value);

	const examples = [
		{
			title: t('refMessage.1.title'),
			text:
				i18n.language === 'en'
					? context?.texts?.ref_text1_EN
					: context?.texts?.ref_text1_RU,
		},
		{
			title: t('refMessage.2.title'),
			text:
				i18n.language === 'en'
					? context?.texts?.ref_text2_EN
					: context?.texts?.ref_text3_RU,
		},
		{
			title: t('refMessage.3.title'),
			text:
				i18n.language === 'en'
					? context?.texts?.ref_text3_EN
					: context?.texts?.ref_text3_RU,
		},
	];

	return (
		<div className={styles._}>
			<h3 className={styles.title}>{t('refMessage.title')}</h3>
			<div className={styles.message__examples}>
				{examples.map((example) => (
					<ExampleCard
						title={example.title}
						text={example.text || ''}
						key={example.title}
						active={activeMessage.title === example.title}
						onClick={() => {
							setActiveMessage(example);
							setTextAreaValue(example.text);
						}}
					/>
				))}
			</div>
			<div
				className={clsx(styles.textWrapper, {
					[styles.textWrapper_light]: context?.theme?.value,
				})}
			>
				<span className={styles.textWrapper__ref}>{refText}</span>
				<textarea
					onChange={handleTextAreaChange}
					className={styles.textArea}
					value={textAreaValue}
				/>
			</div>
			<div className={styles.sendWrapper}>
				<h3 className={styles.title}>{t('refMessage.send')}</h3>
				<div className={styles.buttonWrapper}>
					<Button
						type="icon"
						onClick={() => {
							window.open(
								`https://telegram.me/share/url?url=${refText}&text=${textAreaValue}`,
								'_blank'
							);
						}}
					>
						<TelegramIcon />
					</Button>
					<Button
						type="icon"
						onClick={() => {
							window.open(
								`viber://pa?&text=${refText + textAreaValue}`,
								'_blank'
							);
						}}
					>
						<ViberIcon style={{ height: '100%', width: 'auto' }} />
					</Button>
					<Button
						type="icon"
						onClick={() => {
							{
								window.open(
									`whatsapp://send?text=${refText + textAreaValue}`,
									'_blank'
								);
							}
						}}
					>
						<WhatsupIcon />
					</Button>
					<Button
						type="icon"
						onClick={() => {
							navigator.share({ url: refText, text: textAreaValue });
						}}
					>
						<SmsIcon />
					</Button>
				</div>
			</div>
		</div>
	);
};
