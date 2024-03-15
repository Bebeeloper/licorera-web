import {
  getUser,
  postUserLogin,
} from "../../../../service/modules/users/users";
import { LoginRequest } from "../../../../service/modules/users/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "login",
  async (reqData: LoginRequest, { rejectWithValue, dispatch }) => {
    const response = await postUserLogin(reqData);
    if (!response.success) throw rejectWithValue(response);

    return response;
  }
);

export const getMe = createAsyncThunk(
  "getMe",
  async (token:string, { rejectWithValue }) => {
    const response = await getUser(
      token
    );
    if (!response.success) throw rejectWithValue(response);

    return response;
  }
);
