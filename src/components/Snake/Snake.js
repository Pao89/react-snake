import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Point from "../Point/Point";
import { snakeAction } from "../store/snake";
import snakeClass from "./Snake.module.css";

function Snake(props) {
	const dispatch = useDispatch();
	const coords = useSelector((state) => state.snake.snakeCoords);
	const nextMove = useSelector((state) => state.snake.snakeNextMove);

	const onKeyUpHandler = (e) => {
		let snakeVector = { x: null, y: null };
		switch (e.keyCode) {
			case 37:
				snakeVector.x = -1;
				snakeVector.y = 0;
				break;
			case 38:
				snakeVector.x = 0;
				snakeVector.y = -1;
				break;
			case 39:
				snakeVector.x = 1;
				snakeVector.y = 0;
				break;
			case 40:
				snakeVector.x = 0;
				snakeVector.y = 1;
				break;
			default:
				break;
		}
		if ((snakeVector.x || snakeVector.y) && JSON.stringify(nextMove) !== JSON.stringify(snakeVector))
			dispatch(snakeAction.updateNextMove(snakeVector));
		console.log("hello");
	};

	useEffect(() => {
		window.addEventListener("keyup", onKeyUpHandler);
	}, []);

	useEffect(() => {}, []);

	return <Point className={snakeClass.snake} coords={coords}></Point>;
}

export default Snake;
