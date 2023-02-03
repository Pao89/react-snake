import { createSlice } from "@reduxjs/toolkit";

export const fieldUnits = 100;
const getRandomCoords = () => {
	return { x: Math.floor(Math.random() * fieldUnits), y: Math.floor(Math.random() * fieldUnits) };
};
const targetInitialState = {
	targetCoords: getRandomCoords(),
};

const gameSlice = createSlice({
	name: "game",
	initialState: { ...targetInitialState, fieldUnits: fieldUnits, fieldUnitDimensions: null, gameOver: false },
	reducers: {
		updateUnitDimensions(state, action) {
			const { offsetWidth, offsetHeight } = action.payload;
			state.fieldUnitDimensions = {
				fieldUnitWidth: offsetWidth / fieldUnits,
				fieldUnitHeight: offsetHeight / fieldUnits,
			};
		},
		updateTargetCoords(state) {
			state.targetCoords.x = getRandomCoords().x;
			state.targetCoords.y = getRandomCoords().y;
		},
		gameOver(state) {
			state.gameOver = true;
		},
	},
});

export const gameActions = gameSlice.actions;
export default gameSlice;
