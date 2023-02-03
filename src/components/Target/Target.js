import React from "react";
import { useSelector } from "react-redux";
import Point from "../Point/Point";

import classes from "./Target.module.css";

function Target(props) {
	const coords = useSelector((state) => state.game.targetCoords);
	return <Point className={classes.target} coords={coords}></Point>;
}

export default Target;
