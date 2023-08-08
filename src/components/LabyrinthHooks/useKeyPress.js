import { useState, useEffect } from 'react';

// Хук useKeyPress позволяет отслеживать нажатие клавиши.
// Принимает целевую клавишу (targetKey) в качестве аргумента.
const useKeyPress = (targetKey) => {
	const [keyPressed, setKeyPressed] = useState(false);

	// Обработчик события для нажатия клавиши
	const downHandler = ({ key }) => {
		if (key === targetKey) {
			setKeyPressed(true);
		}
	};

	// Обработчик события для отпускания клавиши
	const upHandler = ({ key }) => {
		if (key === targetKey) {
			setKeyPressed(false);
		}
	};

	useEffect(() => {
		// Добавляем обработчики событий при монтировании компонента
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);

		// Удаляем обработчики событий при размонтировании компонента
		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, []); // Пустой массив зависимостей для запуска только при монтировании

	return keyPressed;
};

export default useKeyPress;
