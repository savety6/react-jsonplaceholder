import { AppDispatch } from "../context/store"
import { useDispatch } from "react-redux"

export const useAppDispatch = () => useDispatch<AppDispatch>()


