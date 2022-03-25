import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "..";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
