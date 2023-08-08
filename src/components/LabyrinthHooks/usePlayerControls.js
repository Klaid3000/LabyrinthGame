import { useEffect } from 'react';
import useKeyPress from './useKeyPress';

// Хук usePlayerControls отслеживает нажатия клавиш для управления игроком.
// Принимает функцию handleMove в качестве аргумента, которая будет вызвана при нажатии клавиш.
const usePlayerControls = (handleMove) => {
	const upPressed = useKeyPress('ArrowUp');
	const downPressed = useKeyPress('ArrowDown');
	const leftPressed = useKeyPress('ArrowLeft');
	const rightPressed = useKeyPress('ArrowRight');

	// Эффект, отслеживающий нажатия клавиш и вызывающий функцию handleMove при необходимости
	useEffect(() => {
		if (upPressed) {
			handleMove(0, -1);
		} else if (downPressed) {
			handleMove(0, 1);
		} else if (leftPressed) {
			handleMove(-1, 0);
		} else if (rightPressed) {
			handleMove(1, 0);
		}
	}, [upPressed, downPressed, leftPressed, rightPressed]);
};

export default usePlayerControls;
