import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		fallbackLng: 'en',
		resources: {
			en: {
				translation: {
					dropdown: {
						account: 'Personal account',
						signIn: 'Sign in',
						main: 'Main page',
						language: 'Language',
						dark: 'Dark theme',
						light: 'Light theme',
					},
					main: {
						install: 'Install MetaMask',
						sold: 'Tokens sold',
						total: 'Total investors',
						text: 'Buy share AMB Distribution Tokens in Pre-Sale for $0.25 and Earn 14x on IEO!',
					},
					info: {
						text: 'Do you want to become a member of a project that has a huge potential for development and establishment in the cryptocurrency market? Then you should definitely pay attention to our shares of AMB distribution tokens, which entitle you to receive monthly income from the monetization of the crypto exchange!',
					},
					referral: {
						title: 'Referral program',
						text: 'Some of the tokens can be purchased for free by inviting friends to participate.',
						firstLevel: '10% first level',
						secondLevel: '5% second level',
					},
					whyUs: {
						title: 'Why us?',
						reasons: {
							1: 'Safety',
							2: 'Reliability',
							3: 'Performance',
							4: 'Condominium',
							5: 'Referral program',
						},
						benefits: {
							1: 'Mobile app available for both Android and iOS users.',
							2: 'Margin trading with S/L T/P orders and leverage.',
							3: 'Liquidity aggregator including Binance.',
							4: 'Module for adding ERC20, BEP20, TRC20 tokens.',
							5: 'Integration of fiat currencies USD, EUR, RUB.',
							6: 'Referral program for additional earnings.',
							7: 'Exchange performance over 100,000 transactions per second.',
							8: "Enhanced security so you don't have to worry about your funds.",
							9: 'P2P and OTK module for secure and convenient transactions.',
							10: 'Launching pad for placement of IEO projects.',
							11: 'Spot trading on major cryptocurrency pairs.',
						},
					},
					about: {
						title: 'About trust',
						text: 'Our team is constantly working on improving and developing the exchange, which provides a stable and high level of profitability for AMB token holders. We are sure that our crypto exchange mainxbit will become the market leader and you will be able to receive significant dividends thanks to the smart choice of investments in AMB tokens. Join us and become part of an innovative project that promises a great future!',
						text1:
							'Join us and become part of an innovative project that promises a great future!',
						numbers: 'About numbers',
						released: 'Released',
						dividends: 'Dividends',
					},
					team: {
						title: 'Our team',
						hide: 'Hide',
						view: 'View all',
					},
					map: {
						title: 'Development map',
					},
					docs: {
						title: 'White paper and One pager',
						text: 'Description of the whole idea and logic from the creation of the logo to the first registered users. Stages of development and implementation of investments. Also a description of the project on one page.',
					},
					footer: {
						contract: 'Contract offer',
						rules: 'Privacy Policy',
					},
					account: {
						title: 'My wallet',
						balance: 'Balance: ',
						buy: 'Buy token',
						token: 'Token (BSC - BEP20)',
						approve: 'Confirm',
						help: 'Write to technical support',
					},
					levels: {
						first: '10% first level',
						second: '5% second level',
						1: 'Number of your referrals',
						2: 'The number of tokens they purchased',
						3: 'Your affiliate commission (10%)',
						4: 'Your affiliate commission (5%)',
					},
					refMessage: {
						title: 'Choose one of the text options or write your own',
						send: 'Send via:',
						1: {
							title: 'Template text 1',
							text: 'Only basic scenarios of user behavior are locked within their own rational limits. In the same way, understanding the essence of resource-saving technologies implies independent ways to implement the gradual and consistent development of society!',
						},
						2: {
							title: 'Template text 2',
							text: 'Only basic scenarios of user behavior are locked within their own rational limits. In the same way, understanding the essence of resource-saving technologies implies independent ways to implement the gradual and consistent development of society!',
						},
						3: {
							title: 'Template text 3',
							text: 'Only basic scenarios of user behavior are locked within their own rational limits. In the same way, understanding the essence of resource-saving technologies implies independent ways to implement the gradual and consistent development of society!',
						},
					},
					accPage: {
						lastEnter: 'Last login time',
						referral: 'Referral program',
						copy: 'Copied',
						auth: 'Sign in ',
					},
				},
			},
			'ru-RU': {
				translation: {
					dropdown: {
						account: 'Личный кабинет',
						signIn: 'Авторизоваться',
						main: 'Главная страница',
						language: 'Язык',
						dark: 'Темная тема',
						light: 'Светлая тема',
					},
					main: {
						install: 'Установить MetaMask',
						sold: 'Токенов продано',
						total: 'Всего инвесторов',
						text: 'Купите доле распределительные токены AMB на предварительной продаже по цене $0,25 и получите доход в 14x на IEO!',
					},
					info: {
						text: 'Хотите стать участником проекта, который имеет огромный потенциал для развития и становления на рынке криптовалют? Тогда вам обязательно стоит обратить внимание на наши доле распределительные токены AMB, которые дают право на получение ежемесячного дохода от монетизации криптобиржи!',
					},
					referral: {
						title: 'Реферальная программа',
						text: 'Часть токенов можно приобрести бесплатно, за счет приглашения друзей к участию.',
						firstLevel: '10% первый уровень',
						secondLevel: '5% второй уровень',
					},
					whyUs: {
						title: 'Почему мы?',
						reasons: {
							1: 'Безопасность',
							2: 'Надежность',
							3: 'Производительность',
							4: 'Совладение',
							5: 'Реферальная программа',
						},
						benefits: {
							1: 'Мобильное приложение, доступное как для пользователей Android, так и iOS.',
							2: 'Маржинальная торговля с ордерами S/L T/P и кредитным плечом.',
							3: 'Агрегатор ликвидности, включая Binance.',
							4: 'Модуль добавления токенов ERC20, BEP20, TRC20.',
							5: 'Интеграция фиатных валют USD, EUR, RUB.',
							6: 'Реферальная программа для дополнительного заработка.',
							7: 'Производительность биржи свыше 100 000 транзакций в секунду.',
							8: 'Повышенная безопасность, чтобы вы могли не переживать о своих средствах.',
							9: 'Модуль P2P и OTK для безопасных и удобных сделок.',
							10: 'Стартовая площадка для размещения IEO проектов.',
							11: 'Спот-торговля на основных криптовалютных парах.',
						},
					},
					about: {
						title: 'О доверии',
						text: 'Наша команда постоянно работает над улучшением и развитием биржи, что обеспечивает стабильный и высокий уровень доходности для держателей AMB токенов. Мы уверены, что наша крипто биржа mainxbit станет лидером на рынке, а вы сможете получать значительные дивиденды благодаря умному выбору вложений в AMB токены. Присоединяйтесь к нам и станьте частью инновационного проекта, который обещает большое будущее!',
						text1:
							'Присоединяйтесь к нам и станьте частью инновационного проекта, который обещает большое будущее!',
						numbers: 'О цифрах',
						released: 'Выпущено',
						dividends: 'Дивиденды',
					},
					team: {
						title: 'Наша команда',
						hide: 'Скрыть',
						view: 'Посмотреть всё',
					},
					map: {
						title: 'Карта развития',
					},
					docs: {
						title: 'White paper и One pager',
						text: 'Описание всей идеи и логики от создания логотипа до первых зарегистрированных пользователей. Этапы разработки и внедрении инвестиций. Также описание проекта на одной странице.',
					},
					footer: {
						contract: 'Договор оферты',
						rules: 'Правила конфиденциальности',
					},
					account: {
						title: 'Мой кошелек',
						balance: 'Баланс: ',
						buy: 'Купить токен',
						token: 'Токен (BSC - BEP20)',
						approve: 'Подтвердить',
						help: 'Написать в техподдержку',
					},
					levels: {
						first: '10% первый уровень',
						second: '5% второй уровень',
						1: 'Количество ваших рефералов',
						2: 'Количество приобретенных ими токенов',
						3: 'Ваше партнерское вознаграждение (10%)',
						4: 'Ваше партнерское вознаграждение (5%)',
					},
					refMessage: {
						title: 'Выберете один из вариантов текста или напишите свой',
						send: 'Отправить через:',
						1: {
							title: 'Шаблонный текст 1',
							text: 'Лишь базовые сценарии поведения пользователей заблокированы в рамках своих собственных рациональных ограничений. Равным образом, понимание сути ресурсосберегающих технологий предполагает независимые способы реализации поэтапного и последовательного развития общества!',
						},
						2: {
							title: 'Шаблонный текст 2',
							text: 'Лишь базовые сценарии поведения пользователей заблокированы в рамках своих собственных рациональных ограничений. Равным образом, понимание сути ресурсосберегающих технологий предполагает независимые способы реализации поэтапного и последовательного развития общества!',
						},
						3: {
							title: 'Шаблонный текст 3',
							text: 'Лишь базовые сценарии поведения пользователей заблокированы в рамках своих собственных рациональных ограничений. Равным образом, понимание сути ресурсосберегающих технологий предполагает независимые способы реализации поэтапного и последовательного развития общества!',
						},
					},
					accPage: {
						lastEnter: 'Время последнего входа',
						referral: 'Реферальная программа',
						copy: 'Скопировано',
						auth: 'Пройдите авторизацию ',
					},
				},
			},
		},
	});
