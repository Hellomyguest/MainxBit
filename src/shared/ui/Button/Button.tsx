import clsx from 'clsx';
import styles from './Button.module.css';

export const Button = ({
	children,
	onClick,
	type,
	className,
}: {
	children: React.ReactNode;
	onClick: () => void;
	type?: 'icon' | 'text';
	className?: string;
}) => {
	return (
		<button
			onClick={onClick}
			className={clsx(
				styles._,
				{ [styles.icon]: type === 'icon', [styles.text]: type === 'text' },
				className
			)}
		>
			{children}
		</button>
	);
};
