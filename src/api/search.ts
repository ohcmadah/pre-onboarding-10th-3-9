import { AxiosRequestConfig } from 'axios';
import { GetSuggestionResponse } from '../@types';
import instance from './index';

const RESOURCE = '/search';
const LIMIT = 10;

export const getSuggestions = async (
  config: { params: { q: string; page: number } } & Omit<AxiosRequestConfig, 'params'>,
) => {
  try {
    const response = await instance.get<GetSuggestionResponse>(`${RESOURCE}`, {
      ...config,
      params: { ...config.params, limit: LIMIT },
    });

    if (response.opcode === 200) {
      return response.data;
    }

    throw new Error(response.message);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return null;
    }
    throw new Error('API getSuggestions error');
  }
};
