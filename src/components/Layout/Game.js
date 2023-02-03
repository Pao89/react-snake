import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Snake from "../Snake/Snake";
import SnakeTail from "../Snake/SnakeTail";
import { gameActions } from "../store/game";
import { snakeAction } from "../store/snake";
import Target from "../Target/Target";
import "./Game.css";

function Game(props) {
	const targetCoords = useSelector((state) => state.game.targetCoords);
	const snakeCoords = useSelector((state) => state.snake.snakeCoords);
	const snakeTail = useSelector((state) => state.snake.snakeTail);
	const snakeNextMove = useSelector((state) => state.snake.snakeNextMove);
	const gameOver = useSelector((state) => state.game.gameOver);
	const dispatch = useDispatch();
	const elRef = useRef(null);

	useEffect(() => {
		const offsets = { offsetWidth: elRef.current.offsetWidth, offsetHeight: elRef.current.offsetHeight };
		dispatch(gameActions.updateUnitDimensions(offsets));
	});

	const snakeCollidedWithTarget = () => targetCoords.x === snakeCoords.x && targetCoords.y === snakeCoords.y;
	const handleSnakeBorderCollision = () => {
		if (snakeCoords.x === 0 || snakeCoords.x === 100) {
			snakeCoords.x === 0
				? dispatch(snakeAction.changeSnakeCoords({ x: 99, y: snakeCoords.y }))
				: dispatch(snakeAction.changeSnakeCoords({ x: 1, y: snakeCoords.y }));
			//can only be 0 or 100, so if it's not 0 then it's automatically 100
		}
		if (snakeCoords.y === 0 || snakeCoords.y === 100) {
			snakeCoords.y === 0
				? dispatch(snakeAction.changeSnakeCoords({ x: snakeCoords.x, y: 99 }))
				: dispatch(snakeAction.changeSnakeCoords({ x: snakeCoords.x, y: 1 }));
		}
	};
	const snakeCollidedWithTail = () => {
		return snakeTail.some((snakeTailPoint) => {
			return JSON.stringify(snakeTailPoint) === JSON.stringify(snakeCoords);
		});
	};

	const updateGame = () => {
		dispatch(snakeAction.updateSnakeCoords());
		if (targetCoords && snakeCoords) {
			if (snakeCollidedWithTarget()) {
				dispatch(snakeAction.addTailElement(targetCoords));
				dispatch(gameActions.updateTargetCoords());
			}
			handleSnakeBorderCollision();
			if (snakeCollidedWithTail()) {
				dispatch(gameActions.gameOver());
			}
		}
	};

	useEffect(() => {
		let nextLoop;
		if (!gameOver) nextLoop = setTimeout(updateGame, 70);
		else {
			alert("Game is over! You collided with your own tail");
			// eslint-disable-next-line no-restricted-globals
			location.reload();
		}
		return () => {
			clearTimeout(nextLoop);
		};
	}, [snakeCoords, snakeNextMove, gameOver]);

	return (
		<div id="game-field" ref={elRef}>
			<Snake></Snake>
			<SnakeTail></SnakeTail>
			<Target></Target>
		</div>
	);
}

export default Game;
