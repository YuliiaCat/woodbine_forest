import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ITree from '../../types/tree';
import { addNewTree, deleteTreeOperation, getTrees, setTreeDataOperation, updateTreeData } from './operations';

interface TreeState {
  trees: ITree[];
  treeData: Partial<ITree>;
  loading: boolean;
}

const initialState: TreeState = {
  trees: [],
  treeData: {
    id: Date.now(),
    title: '',
    date: null,
    image: null,
    location: {
      latitude: null,
      longitude: null,
      address: '',
    },
    events: [],
    description: '',
    locationName: '',
  },
  loading: false,
};

const forestSlice = createSlice({
  name: 'forest',
  initialState,
  reducers: {
    setTrees: (state, action) => {
      state.trees = action.payload;
    },
    deleteTree: (state, action) => {
      state.trees = state.trees.filter((tree) => tree.id !== action.payload);
    },
    setTreeData: (state, action: PayloadAction<Partial<ITree>>) => {
      state.treeData = { ...state.treeData, ...action.payload };
    },
    updateTree: (state, action) => {
      const index = state.trees.findIndex((tree) => tree.id === action.payload.id);
      if (index !== -1) {
        state.trees[index] = { ...state.trees[index], ...action.payload };
      }
    },
    resetTreeData: (state) => {
      state.treeData = initialState.treeData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTrees.fulfilled, (state, action: PayloadAction<ITree[]>) => {
        state.loading = false;
        state.trees = action.payload ?? [];
      })
      .addCase(getTrees.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addNewTree.fulfilled, (state, action: PayloadAction<ITree | undefined>) => {
        if (action.payload) {
          state.trees.push(action.payload);
        }
      })
      .addCase(deleteTreeOperation.fulfilled, (state, action: PayloadAction<number | undefined>) => {
        state.loading = false;
        if (action.payload !== undefined) {
          state.trees = state.trees.filter(tree => tree.id !== action.payload);
        }
      })
      .addCase(setTreeDataOperation.fulfilled, (state, action: PayloadAction<Partial<ITree> | undefined>) => {
        if (action.payload) {
          state.treeData = { ...state.treeData, ...action.payload };
        }
      })
      .addCase(updateTreeData.fulfilled, (state, action) => {
        const index = state.trees.findIndex((tree) => tree.id === action.payload?.id);
        if (index !== -1) {
          state.trees[index] = { ...state.trees[index], ...action.payload };
        }
      });
  },
});

export const {
  setTrees,
  deleteTree,
  setTreeData,
  resetTreeData,
  updateTree,
} = forestSlice.actions;
export default forestSlice.reducer;
