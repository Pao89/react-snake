import React from "react";
import { useSelector } from "react-redux";

import point from "./Point.module.css";

function Point(props) {
	const className = `${point.point} ${props.className}`;
	const fieldUnits = useSelector((state) => state.game.fieldUnits);
	const fieldUnitDimensions = useSelector((state) => state.game.fieldUnitDimensions);
	let x, y;
	let height, width;

	if (fieldUnitDimensions) {
		width = `${fieldUnitDimensions.fieldUnitWidth}px`;
		height = `${fieldUnitDimensions.fieldUnitHeight}px`;
	}

	if (props.coords && fieldUnits) {
		x = `${props.coords.x}%`;
		y = `${props.coords.y}%`;
	}

	return <div className={className} style={{ height: height, width: width, top: y, left: x }}></div>;
}

export default Point;
