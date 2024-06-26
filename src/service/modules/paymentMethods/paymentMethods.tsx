import { AddPaymentResponse, Data } from '../../../store/modules/paymentMethods/types';
import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';
import { AddPaymentMethod, DeletePaymentMethod, posPaymentCredit } from './types';

export const getPaymentMethods = async (): Promise<ApiResponse<Data>> => {
  try {
   
    const {data} = await base.get<Data>(
      '/v2/me/paymentMethods',
      {}
      );
      // console.log('Data service: ',data.data);
      
      return { response: data.data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const deletePaymentMethods = async (reqData: DeletePaymentMethod): Promise<ApiResponse<Data>> => {
  try {
    const {data} = await base.post<Data>(
      '/v2/me/paymentMethods/remove',
      reqData,
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

// export const addPaymentMethods = async (reqData: AddPaymentMethod): Promise<ApiResponse<Data>> => {
export const addPaymentMethods = async (reqData: AddPaymentMethod): Promise<ApiResponse<AddPaymentResponse>> => {
  try {
    // const {data} = await base.post<Data>(
    const {data} = await base.post<AddPaymentResponse>(
      '/v2/me/paymentMethods/add',
      reqData,
      {}
      );
      console.log('data en el servicio: ', data);
      
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const getPaymentBanks = async (): Promise<ApiResponse<Data>> => {
  try {
   
    const {data} = await base.get<Data>(
      '/v2/payments/banks',
      {}
      );
      
      return { response: data.data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const posPaymentPse  = async (reqData: AddPaymentMethod): Promise<ApiResponse<Data>> => {
  try {
   
    const {data} = await base.post<Data>(
      '/v2/payments/pse',
      reqData,
      {}
      );
      
      return { response: data.data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const posPaymentCreditCard  = async (reqData: posPaymentCredit): Promise<ApiResponse<Data>> => {
  try {
   
    const {data} = await base.post<Data>(
      '/v2/payments/creditCard',
      reqData,
      {}
      );
      
      return { response: data.data || data.message, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};



