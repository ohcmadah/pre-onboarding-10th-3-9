import { AxiosRequestConfig } from 'axios';
import { GetSuggestionResponse } from '../@types';
import instance from './index';

const RESOURCE = '/search';

export const getSuggestions = async (
  config: { params: { q: string; page: number; limit: number } } & Omit<
    AxiosRequestConfig,
    'params'
  >,
) => {
  try {
    const response = await instance.get<GetSuggestionResponse>(`${RESOURCE}`, config);

    if (response.opcode === 200) {
      return response.data;
    }

    throw new Error(response.message);
  } catch (error) {
    throw new Error('API getSuggestions error');
  }
};
