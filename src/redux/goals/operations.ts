import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import IGoal from '../../types/goal';
import { RootState } from '../store';
import { addGoal, deleteGoal, setGoals } from './slice';

export const fetchGoals = createAsyncThunk(
  'goals/fetchGoals',
  async (_, { dispatch }) => {
    try {
      const storedGoals = await AsyncStorage.getItem('goals');
      const parsedGoals: IGoal[] = storedGoals ? JSON.parse(storedGoals) : [];
      dispatch(setGoals(parsedGoals));
      return parsedGoals;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addGoalOperation = createAsyncThunk(
  'goals/addGoal',
  async (goal: IGoal, { dispatch, getState }) => {
    try {
      dispatch(addGoal(goal));
      const goals = (getState() as RootState).goals.goals;
      await AsyncStorage.setItem('goals', JSON.stringify(goals));
      return goal;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteGoalOperation = createAsyncThunk(
  'goals/deleteGoal',
  async (goalId: number, { dispatch, getState }) => {
    try {
      dispatch(deleteGoal(goalId));
      const goals = (getState() as RootState).goals.goals;
      await AsyncStorage.setItem('goals', JSON.stringify(goals));
      return goalId;
    } catch(error) {
      console.log(error);
    }
  }
);

