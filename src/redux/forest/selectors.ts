import { RootState } from '../store';

export const selectForest = (state: RootState) => state.forest.trees;
export const selectTreeData = (state: RootState) => state.forest.treeData;
