import Cell from './Cell';

// Компонент GameBoard отображает игровую доску (лабиринт) и элементы игры на ней.
// Он принимает пропсы: labyrinthMap (карта лабиринта), playerPosition (позиция игрока),
// handleMove (обработчик движения игрока), isGameFinished (флаг, определяющий завершение игры)
// и resetGame (функция для сброса игры в начальное состояние).
const GameBoard = ({
	labyrinthMap,
	playerPosition,
	handleMove,
	isGameFinished,
	resetGame,
}) => {
	return (
		<div>
			<table>
				<tbody>
					{labyrinthMap.map((row, y) => (
						<tr key={y}>
							{row.map((cell, x) => (
								<Cell
									key={x}
									type={
										cell === 1
											? 'wall'
											: cell === 2
											? 'start'
											: cell === 3
											? 'finish'
											: ''
									}
									isPlayer={
										playerPosition.x === x && playerPosition.y === y
									}
									onClick={() =>
										handleMove(
											x - playerPosition.x,
											y - playerPosition.y,
										)
									}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
			{isGameFinished && <button onClick={resetGame}>Начать заново</button>}
		</div>
	);
};

export default GameBoard;
