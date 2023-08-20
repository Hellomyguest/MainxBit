import { ReactComponent as Document } from './lib/document.svg';
import { ReactComponent as Moon } from './lib/moon.svg';
import styles from './DocsBlock.module.css';
import { Button } from '../../../../shared/ui/Button/Button';

export const DocsBlock = () => {
	return (
		<div className={styles._}>
			<div className={styles.container}>
				<Document />
				<div className={styles.content}>
					<h2 className={styles.title}>White paper и One pager</h2>
					<span className={styles.text}>
						Описание всей идеи и логики от создания логотипа до первых
						зарегистрированных пользователей. Этапы разработки и внедрении
						инвестиций. Также описание проекта на одной странице.
					</span>
					<div className={styles.buttonWrapper}>
						<Button className={styles.button} onClick={() => {}}>
							White paper
						</Button>
						<Button className={styles.button} onClick={() => {}}>
							One pager
						</Button>
					</div>
				</div>
				<Moon className={styles.moon} />
			</div>
		</div>
	);
};
