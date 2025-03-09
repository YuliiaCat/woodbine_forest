import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ITree from '../../types/tree';
import { addEventOperation, addNewTree, deleteEventOperation, deleteTreeOperation, getTrees, setTreeDataOperation, updateTreeData } from './operations';

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
    event: [],
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
    addTree: (state, action) => {
      state.trees.push(action.payload);
    },
    deleteTree: (state, action) => {
      state.trees = state.trees.filter((tree) => tree.id !== action.payload);
    },
    setTreeData: (state, action) => {
      state.treeData = action.payload;
    },
    updateTree: (state, action) => {
      const index = state.trees.findIndex((tree) => tree.id === action.payload.id);
      if (index !== -1) {
        state.trees[index] = { ...state.trees[index], ...action.payload };
      }
    },
    addEvent: (state, action: PayloadAction<{ id: number; event: { eventId: number; description: string; date: string } }>) => {
      const tree = state.trees.find((tr) => tr.id === action.payload.id);
      if (tree) {
        const newEvent = {
          ...action.payload.event,
          date: new Date(action.payload.event.date),
        };
        tree.event = [...(tree.event || []), newEvent];
      }
    },
    deleteEvent: (state, action: PayloadAction<{ id: number; eventId: number }>) => {
      const tree = state.trees.find((tr) => tr.id === action.payload.id);
      if (tree) {
        tree.event = tree.event?.filter((event) => event.eventId !== action.payload.eventId) || [];
      }
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
      .addCase(setTreeDataOperation.fulfilled, (state, action: PayloadAction<ITree>) => {
          state.treeData = action.payload;
        })
      .addCase(updateTreeData.fulfilled, (state, action: PayloadAction<Partial<ITree> & { id: number } | undefined>) => {
        if (action.payload) {
          const index = state.trees.findIndex((tree) => tree.id === action.payload?.id);
          if (index !== -1) {
            state.trees[index] = { ...state.trees[index], ...action.payload };
          }
        }
      })
      .addCase(addEventOperation.fulfilled, (state, action: PayloadAction<{ treeId: number; event: { eventId: number; description: string; date: string } } | undefined>) => {
          if (!action.payload) {
            return;
          }

          const tree = state.trees.find((t) => t.id === action.payload?.treeId);
          if (tree) {
            const newEvent = {
              ...action.payload.event,
              date: new Date(action.payload.event.date),
            };

            tree.event = [...(tree.event || []), newEvent];
          }
        }
      )
      .addCase(deleteEventOperation.fulfilled, (state, action: PayloadAction<{ id: number; eventId: number } | null>) => {
        if (!action.payload) {
          return;
        }
        const { id, eventId } = action.payload;

        if (state.treeData && state.treeData.id === id && state.treeData.event) {
          state.treeData.event = state.treeData.event.filter(event => event.eventId !== eventId);
        }

        state.trees = state.trees.map(tree =>
          tree.id === id
            ? { ...tree, event: tree.event?.filter(event => event.eventId !== eventId) ?? [] }
            : tree
        );
      });
  },
});

export const {
  setTrees,
  addTree,
  setTreeData,
  updateTree,
  deleteTree,
  addEvent,
  deleteEvent,
} = forestSlice.actions;
export default forestSlice.reducer;
