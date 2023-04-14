import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useGetMealsByParametersQuery } from '../../api/meals.rtk-api';
import { ResultMeal } from '../../types/meal-api.type';

interface MealsState {
  meals: ResultMeal[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MealsState = {
  meals: [],
  isLoading: false,
  error: null,
};

export const fetchMealsByParameters = createAsyncThunk(
  'meals/fetchMealsByParameters',
  async (query: string) => {
    const { data } = await useGetMealsByParametersQuery({
      query: query ? query : 'a',
      type: 'main course,side dish,dessert,salad,bread,breakfast,soup',
      addRecipeInformation: true,
      number: 10,
      sort: 'rating',
    });
    if (data) {
      return data.results;
    } else {
      throw new Error('Cant get results from API');
    }
  }
);

export const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealsByParameters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMealsByParameters.fulfilled, (state, action) => {
        state.meals = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchMealsByParameters.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ?? 'An error occurred while trying to get meals from API.';
      });
  },
});

export default mealsSlice.reducer;
