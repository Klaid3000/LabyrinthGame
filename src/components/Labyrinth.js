import { useState, useEffect, useCallback } from 'react';

const Labyrinth = () => {
	const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
	const [isGameFinished, setIsGameFinished] = useState(false);
	const [keysPressed, setKeysPressed] = useState({});
	const [labyrinthMap, setLabyrinthMap] = useState([
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
		[1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
		[1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
		[1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
		[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
		[1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
		[1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	]);

	const getStartPosition = () => {
		for (let y = 0; y < labyrinthMap.length; y++) {
			for (let x = 0; x < labyrinthMap[y].length; x++) {
				if (labyrinthMap[y][x] === 2) {
					return { x, y };
				}
			}
		}
		return { x: 0, y: 0 }; // Позиция по умолчанию, если точка старта не найдена
	};

	useEffect(() => {
		const startPosition = getStartPosition();
		setPlayerPosition(startPosition);
	}, [labyrinthMap]);

	// Функция для обработки движения игрока
	const handleMove = (dx, dy) => {
		const newX = playerPosition.x + dx;
		const newY = playerPosition.y + dy;

		const isValidMove = isValidMoveWithinNeighbors(newX, newY);

		if (isValidMove) {
			const newPositionValue = labyrinthMap[newY][newX];

			if (newPositionValue !== 1) {
				setPlayerPosition({ x: newX, y: newY });

				if (newPositionValue === 3) {
					setIsGameFinished(true);
					alert('Поздравляем, вы достигли финиша!');
				}
			}
		}
	};
	//функцию для сброса игры в исходное состояние
	const resetGame = () => {
		setIsGameFinished(false);
		const startPosition = getStartPosition();
		setPlayerPosition(startPosition);
	};

	// Функция для проверки, что новые координаты являются соседними клетками
	const isValidMoveWithinNeighbors = (newX, newY) => {
		const dx = Math.abs(newX - playerPosition.x);
		const dy = Math.abs(newY - playerPosition.y);
		return (
			(dx === 1 && dy === 0 && labyrinthMap[newY][newX] !== 2) ||
			(dx === 0 && dy === 1 && labyrinthMap[newY][newX] !== 2)
		);
	};

	// Функция для отображения лабиринта в виде таблицы
	const renderLabyrinth = () => {
		return (
			<div>
				<table>
					<tbody>
						{labyrinthMap.map((row, y) => (
							<tr key={y}>
								{row.map((cell, x) => (
									<td
										key={x}
										className={`cell ${
											cell === 1
												? 'wall'
												: cell === 2
												? 'start'
												: cell === 3
												? 'finish'
												: ''
										} ${
											playerPosition.x === x &&
											playerPosition.y === y
												? 'player'
												: ''
										}`}
										onClick={() =>
											handleMove(
												x - playerPosition.x,
												y - playerPosition.y,
											)
										}
									>
										{/* Здесь можно добавить другие элементы для ячеек, например, изображения или текст */}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				{isGameFinished && <button onClick={resetGame}>Начать заново</button>}
			</div>
		);
	};
	const handleKeyDown = (event) => {
		setKeysPressed((prevKeys) => ({
			...prevKeys,
			[event.key]: true,
		}));
	};

	const handleKeyUp = (event) => {
		setKeysPressed((prevKeys) => ({
			...prevKeys,
			[event.key]: false,
		}));
	};

	const handleMoveByKey = useCallback(() => {
		if (keysPressed.ArrowUp) {
			handleMove(0, -1);
		} else if (keysPressed.ArrowDown) {
			handleMove(0, 1);
		} else if (keysPressed.ArrowLeft) {
			handleMove(-1, 0);
		} else if (keysPressed.ArrowRight) {
			handleMove(1, 0);
		}
	}, [handleMove, keysPressed]);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	useEffect(() => {
		handleMoveByKey();
	}, [handleMoveByKey]);

	return (
		<div className="labyrinth" tabIndex="0">
			{renderLabyrinth()}
		</div>
	);
};

export default Labyrinth;
