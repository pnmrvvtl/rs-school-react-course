//libs
import axios from 'axios';
//types
import {
  MealByIdResponse,
  MealsByParametersQuery,
  MealsByParametersResponse,
  ResultMeal,
} from '../types/meal-api.type';

export default class MealsApi {
  baseUrl: string;
  headers: Record<string, string>;

  constructor(
    baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    headers = {
      'X-RapidAPI-Key': import.meta.env.VITE_MEALS_API_KEY,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    }
  ) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async getData<QueryParamsType, ResponseParamsType>(
    path: string,
    queryParams: QueryParamsType | undefined
  ): Promise<ResponseParamsType> {
    const options = {
      method: 'GET',
      url: `${this.baseUrl}/${path}`,
      params: queryParams,
      headers: {
        'X-RapidAPI-Key': '10cad0d3femshd472710c018634bp1633dbjsnca6775c47de1',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };
    const response = await axios.request(options);
    if (response.status === 200) {
      return await response.data;
    } else {
      throw new Error(
        `Error in getting meals API, path = ${path},  query = ${JSON.stringify(queryParams)}`
      );
    }
  }

  async getMealsByParameters(params: MealsByParametersQuery): Promise<MealsByParametersResponse> {
    return await this.getData<MealsByParametersQuery, MealsByParametersResponse>(
      'recipes/complexSearch',
      params
    );
  }

  async getMealById(mealId: number): Promise<ResultMeal> {
    return await this.getData<undefined, ResultMeal>(`recipes/${mealId}/information`, undefined);
  }
}
