import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IGoal from '../../types/goal';
import { addGoalOperation, deleteGoalOperation, fetchGoals } from './operations';

interface IGoalsState {
  goals: IGoal[];
  loading: boolean;
  error: string | null;
}

const initialState: IGoalsState = {
  goals: [],
  loading: false,
  error: null,
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setGoals: (state, action: PayloadAction<IGoal[]>) => {
      state.goals = action.payload;
    },
    addGoal: (state, action: PayloadAction<IGoal>) => {
      state.goals.push(action.payload);
    },
    deleteGoal: (state, action: PayloadAction<number>) => {
      state.goals = state.goals.filter((goal) => goal.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = action.payload ?? [];
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch goals';
      })
      .addCase(addGoalOperation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGoalOperation.fulfilled, (state, action) => {
        if (action.payload) {
          state.goals.push(action.payload);
          state.error = null;
        }
      })
      .addCase(addGoalOperation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add goal';
      })
      .addCase(deleteGoalOperation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGoalOperation.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = state.goals.filter(goal => goal.id !== action.payload);
      })
      .addCase(deleteGoalOperation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete goal';
      });
  },
});

export const { setGoals, addGoal, deleteGoal } = goalsSlice.actions;
export default goalsSlice.reducer;

