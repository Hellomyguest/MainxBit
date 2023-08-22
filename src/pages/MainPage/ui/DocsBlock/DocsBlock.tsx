import { InView } from 'react-intersection-observer';
import { ReactComponent as Document } from './lib/document.svg';
import { ReactComponent as Moon } from './lib/moon.svg';
import styles from './DocsBlock.module.css';
import { Button } from '../../../../shared/ui/Button/Button';
import clsx from 'clsx';

export const DocsBlock = () => {
	return (
		<div className={styles._}>
			<div className={styles.container}>
				<Document />
				<div className={styles.content}>
					<InView>
						{({ inView, ref }) => (
							<h2
								ref={ref}
								className={clsx(styles.title, {
									[styles.title_visible]: inView,
								})}
							>
								White paper и One pager
							</h2>
						)}
					</InView>
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
