import { useState, useContext } from 'react';
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

const examples = [
	{
		title: 'Шаблонный текст 1',
		text: 'Лишь базовые сценарии поведения пользователей заблокированы в рамках своих собственных рациональных ограничений. Равным образом, понимание сути ресурсосберегающих технологий предполагает независимые способы реализации поэтапного и последовательного развития общества!',
	},
	{
		title: 'Шаблонный текст 2',
		text: 'Лишь базовые сценарии поведения пользователей заблокированы в рамках своих собственных рациональных ограничений. Равным образом, понимание сути ресурсосберегающих технологий предполагает независимые способы реализации поэтапного и последовательного развития общества!',
	},
	{
		title: 'Шаблонный текст 3',
		text: 'Лишь базовые сценарии поведения пользователей заблокированы в рамках своих собственных рациональных ограничений. Равным образом, понимание сути ресурсосберегающих технологий предполагает независимые способы реализации поэтапного и последовательного развития общества!',
	},
];

export const ReferralMessage = ({ refText }: { refText: string }) => {
	const context = useContext(Context);
	const [activeMessage, setActiveMessage] = useState({
		title: 'Шаблонный текст 1',
		text: 'Лишь базовые сценарии поведения пользователей заблокированы в рамках своих собственных рациональных ограничений. Равным образом, понимание сути ресурсосберегающих технологий предполагает независимые способы реализации поэтапного и последовательного развития общества!',
	});
	const [textAreaValue, setTextAreaValue] = useState(activeMessage.text);

	const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setTextAreaValue(e.target.value);

	return (
		<div className={styles._}>
			<h3 className={styles.title}>
				Выберете один из вариантов текста или напишите свой
			</h3>
			<div className={styles.message__examples}>
				{examples.map((example) => (
					<ExampleCard
						title={example.title}
						text={example.text}
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
				<h3 className={styles.title}>Отправить через:</h3>
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
