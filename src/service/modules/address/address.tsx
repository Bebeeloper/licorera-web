import { Data } from '../../../store/modules/campaigns/types';
import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';

export const getGoogleApi = async (search:string): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.get<Data>(
      `/v2/locations/google/${search}`
      );
    return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const getGoogleReverseApi = async (latitude:number,longitude:number): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.get<Data>(
      `/v2/locations/google/${latitude}/${longitude}`
      );
    return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};
