//redux
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//types
import {
  MealsByParametersQuery,
  MealsByParametersResponse,
  ResultMeal,
} from '../../types/meal-api.type';

export const mealsApi = createApi({
  reducerPath: 'mealsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    prepareHeaders(headers) {
      headers.set('X-RapidAPI-Key', '10cad0d3femshd472710c018634bp1633dbjsnca6775c47de1');
      headers.set('X-RapidAPI-Host', 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getMealsByParameters: builder.query<MealsByParametersResponse, MealsByParametersQuery>({
        query(params) {
          return {
            url: 'recipes/complexSearch',
            params,
          };
        },
      }),
      getMealById: builder.query<ResultMeal, number>({
        query(mealId) {
          return `recipes/${mealId}/information`;
        },
      }),
    };
  },
});

export const { useGetMealsByParametersQuery, useGetMealByIdQuery } = mealsApi;
