import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Labyrinth from './components/Labyrinth';
import GameOver from './components/GameOver';

const App = () => {
	return (
		<Router>
			<div className="app">
				<nav>
					<ul>
						<li>
							<Link to="/">Лабиринт</Link>
						</li>
						{/* Добавляем ссылку на страницу с экраном завершения игры */}
						<li>
							<Link to="/game-over">Завершение игры</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					{/* Первый маршрут отображает компонент Labyrinth */}
					<Route path="/" element={<Labyrinth />} />
					{/* Второй маршрут отображает компонент GameOver */}
					<Route path="/game-over" element={<GameOver />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
