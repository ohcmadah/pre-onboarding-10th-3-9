import { GetSuggestionResponse } from '../@types';
import instance from './index';

const RESOURCE = '/search';

export const getSuggestions = async (params: { q: string; page: number; limit: number }) => {
  try {
    const response = await instance.get<GetSuggestionResponse>(`${RESOURCE}`, { params });

    if (response.opcode === 200) {
      return response.data;
    }

    throw new Error(response.message);
  } catch (error) {
    throw new Error('API getSuggestions error');
  }
};
