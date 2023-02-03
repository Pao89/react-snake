import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./game";
import snakeSlice from "./snake";

const store = configureStore({
	reducer: { game: gameSlice.reducer, snake: snakeSlice.reducer },
});

export default store;
