import { RootState } from '../store';

export const selectGoals = (state: RootState) => state.goals.goals;
