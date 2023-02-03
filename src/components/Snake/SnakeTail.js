import React from "react";
import { useSelector } from "react-redux";
import Point from "../Point/Point";

import classes from "./Snake.module.css";

function SnakeTail() {
	const snakeTail = useSelector((state) => state.snake.snakeTail);
	return snakeTail.map((snakeTailElement, index) => {
		return <Point key={index} className={classes.snake} coords={snakeTailElement}></Point>;
	});
}

export default SnakeTail;
