import { productExchange } from "../../../modules/exchangeProducts/types";
import { reducer } from "../../store";
import { LoadingStatus } from "../../tools";

export type RootState = ReturnType<typeof reducer>;

export interface PromotionState {
    state: Data ;
    error: string | null | undefined;
    loadingStatus: LoadingStatus;
}

export interface Data {
    data:productExchange[];
    success:boolean;
    message:string
}

