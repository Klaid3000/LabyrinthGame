import React from 'react';

// Компонент Cell представляет собой отдельную ячейку в лабиринте.
// Он принимает три пропса: type (тип ячейки), isPlayer (флаг, указывающий, находится ли игрок в этой ячейке) и onClick (обработчик щелчка на ячейке).
const Cell = ({ type, isPlayer, onClick }) => {
	// Собираем строку из классов для определения стилей ячейки
	const classNames = `cell ${type} ${isPlayer ? 'player' : ''}`;
	// Возвращаем ячейку с соответствующими классами и обработчиком щелчка
	return <td className={classNames} onClick={onClick}></td>;
};

export default Cell;
