import { useSelector, TypedUseSelectorHook } from "react-redux"
import { RootState } from "../context/store"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector



