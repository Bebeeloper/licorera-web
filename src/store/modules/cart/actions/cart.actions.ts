import { createAsyncThunk } from "@reduxjs/toolkit";
import { cancelCurrentOrder, getCurrentOrder, getOrderById, postOrder, requestOrder, requestUpdateOrder, updateOrder } from "../../../../service/modules/orders/order";


export const getCurrentOrderThunk = createAsyncThunk(
  "getCurrentOrderThunk/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentOrder();
      console.log(response);
      return response;
    } catch (error: any) { 
      return rejectWithValue(error.message); 
    }
  }
);

export const getOrderByIdThunk = createAsyncThunk(
  "getOrderByIdThunk/fetch",
  async ( id: number, { rejectWithValue }) => {
    try {
      const response = await getOrderById(id);
      console.log(response);
      return response;
    } catch (error: any) { 
      return rejectWithValue(error.message); 
    }
  }
);

export const cancelCurrentOrderThunk = createAsyncThunk(
  "cancelCurrentOrderThunk/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cancelCurrentOrder();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); 
    }
  }
);

export const postOrderThunk = createAsyncThunk(
    "posPaymentPseThunk/fetch",
    async ({reqData}: {reqData: requestOrder}, { rejectWithValue }) => {
      try {
        const response = await postOrder(reqData);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.message); 
      }
    }
  );

  export const updateOrderThunk = createAsyncThunk(
    "updateOrderThunk/fetch",
    async ({id, reqData }: { id: number, reqData: requestUpdateOrder}, { rejectWithValue }) => {
      try {
        const response = await updateOrder(id, reqData);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.message); 
      }
    }
  );  