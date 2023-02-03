import { createSlice } from "@reduxjs/toolkit";
import { fieldUnits } from "./game";

const snakeSlice = createSlice({
	name: "snake",
	initialState: {
		snakeCoords: { x: fieldUnits / 2, y: fieldUnits / 2 },
		snakeNextMove: { x: 0, y: 0 },
		snakeTail: [],
	},
	reducers: {
		updateNextMove(state, action) {
			const nextMove = action.payload;
			state.snakeNextMove.x = nextMove.x;
			state.snakeNextMove.y = nextMove.y;
		},
		updateSnakeCoords(state) {
			let oldX = state.snakeCoords.x;
			let oldY = state.snakeCoords.y;
			state.snakeCoords.x = state.snakeCoords.x + state.snakeNextMove.x;
			state.snakeCoords.y = state.snakeCoords.y + state.snakeNextMove.y;
			state.snakeTail.forEach((snakeTailPoint) => {
				let oldTailPointX = snakeTailPoint.x;
				let oldTailPointY = snakeTailPoint.y;
				snakeTailPoint.x = oldX;
				snakeTailPoint.y = oldY;
				oldX = oldTailPointX;
				oldY = oldTailPointY;
			});
		},
		changeSnakeCoords(state, action) {
			const forcedCoords = action.payload;
			state.snakeCoords.x = forcedCoords.x;
			state.snakeCoords.y = forcedCoords.y;
		},
		addTailElement(state, action) {
			const tailComponentCoords = action.payload;
			state.snakeTail.push(tailComponentCoords);
		},
	},
});

export const snakeAction = snakeSlice.actions;
export default snakeSlice;
