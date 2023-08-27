import { useState, useEffect } from 'react';

const SCREEN_SM = 576;
const SCREEN_SMM = 800;
const SCREEN_MD = 968;
const SCREEN_LG = 1280;
const SCREEN_XL = 1680;
const SCREEN_XXL = 1945;

export const useResize = () => {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = (event: Event) => {
			setWidth((event?.target as Window).innerWidth);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return {
		width,
		isScreenSm: width > SCREEN_SM,
		isScreenSmm: width > SCREEN_SMM,
		isScreenMd: width > SCREEN_MD,
		isScreenLg: width > SCREEN_LG,
		isScreenXl: width > SCREEN_XL,
		isScreenXxl: width > SCREEN_XXL,
	};
};
