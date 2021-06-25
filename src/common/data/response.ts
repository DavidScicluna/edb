import { Response } from '../types/types';

const defaultResponse: Response<any[]> = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
};

export default defaultResponse;
