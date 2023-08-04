import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type Post = {
  date: string;
  title: string;
  discription: string;
  src: string;
  id: string;
};

type Sort = {
  name: string;
  sortProperty: string;
};

type PostsState = {
  filterPosts: Post[];
  categoryId: number;
  sort: Sort;
  currentPage: number;
  searchValue: string;
};

const initialState: PostsState = {
  filterPosts: [],
  categoryId: 0,
  sort: {
    name: "popular",
    sortProperty: "rating",
  },
  currentPage: 1,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<any>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<any>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<any>) => {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilter = (state: any) => state.filterReducer;

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
