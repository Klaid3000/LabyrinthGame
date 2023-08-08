import { useState, useEffect } from 'react';
import GameBoard from './LabyrinthComponents/GameBoard';
import usePlayerControls from './LabyrinthHooks/usePlayerControls';
import Lvl1 from './LabyrinthComponents/LabyrinthMap/Lvl1';

const Labyrinth = () => {
	//Состояния компонента
	const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 }); // Состояние для позиции игрока
	const [isGameFinished, setIsGameFinished] = useState(false); // Состояние для проверки окончания игры
	const [labyrinthMap, setLabyrinthMap] = useState(Lvl1); // Состояние для хранения карты лабиринта

	// Функция для определения начальной позиции игрока
	const getStartPosition = () => {
		// Проход по всей карте лабиринта для поиска точки старта
		for (let y = 0; y < labyrinthMap.length; y++) {
			for (let x = 0; x < labyrinthMap[y].length; x++) {
				// Если найдена точка старта (значение 2), возвращает её позицию
				if (labyrinthMap[y][x] === 2) {
					return { x, y };
				}
			}
		}
		// Если точка старта не найдена, возвращает позицию (0, 0)
		return { x: 0, y: 0 };
	};

	// Установка начальной позиции игрока при изменении карты лабиринта
	useEffect(() => {
		const startPosition = getStartPosition();
		setPlayerPosition(startPosition);
	}, [labyrinthMap]);

	// Функция для обработки движения игрока
	const handleMove = (dx, dy) => {
		// Вычисление новых координат игрока
		const newX = playerPosition.x + dx;
		const newY = playerPosition.y + dy;

		// Проверка, является ли ход валидным (в пределах соседних клеток и без стены)
		const isValidMove = isValidMoveWithinNeighbors(newX, newY);

		if (isValidMove) {
			// Получение значения новой позиции
			const newPositionValue = labyrinthMap[newY][newX];

			if (newPositionValue !== 1) {
				// Если новая позиция не стена
				setPlayerPosition({ x: newX, y: newY }); // Обновление позиции игрока

				if (newPositionValue === 3) {
					// Если новая позиция финиш
					setIsGameFinished(true); // Устанавливается состояние окончания игры
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
		const dx = Math.abs(newX - playerPosition.x); // Разница по X между текущей и новой позицией
		const dy = Math.abs(newY - playerPosition.y); // Разница по Y между текущей и новой позицией
		// Возвращается true, если новые координаты соседние и не равны точке старта
		return (
			(dx === 1 && dy === 0 && labyrinthMap[newY][newX] !== 2) ||
			(dx === 0 && dy === 1 && labyrinthMap[newY][newX] !== 2)
		);
	};

	// Функция для отображения лабиринта в виде таблицы
	const renderLabyrinth = () => {
		return (
			<div className="labyrinth" tabIndex="0">
				<GameBoard
					labyrinthMap={Lvl1}
					playerPosition={playerPosition}
					handleMove={handleMove}
					isGameFinished={isGameFinished}
					resetGame={resetGame}
				/>
			</div>
		);
	};

	usePlayerControls(handleMove); // Использование хука для управления движением игрока

	return (
		<div className="labyrinth" tabIndex="0">
			{renderLabyrinth()}
		</div>
	);
};

export default Labyrinth;
