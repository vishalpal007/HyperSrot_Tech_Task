import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "./taskApi";


const reduxStore = configureStore({
    reducer: {
        [taskApi.reducerPath]: taskApi.reducer,
    },
    middleware: def => [...def(), taskApi.middleware]
})

export default reduxStore