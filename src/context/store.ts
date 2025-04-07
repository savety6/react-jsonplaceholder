import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/users/user-slice"
import { apiSlice } from "../features/api/api-slice"

const store = configureStore({
    reducer: {
        users: userReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
