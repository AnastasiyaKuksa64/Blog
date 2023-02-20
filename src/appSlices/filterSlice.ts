import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import pickBy from 'lodash/pickBy';
// import identity from 'lodash/identity';
// import axios from 'axios';

type Post = {
  date: string;
  title: string;
  discription: string;
  src: string;
  category: number;
  rating: number | any;
  popular: string;
  id: string;
};

export type PostsParams = {
  sortBy: string;
  category: string;
  currentPage: string;
};

type PostsState = {
  filterPosts: Post[];
  categoryId: number;
  currentPage: number;
};

const initialState: PostsState = {
  filterPosts: [],
  currentPage: 1,
  categoryId: 0,
};

export const fetchFilteredPosts = createAsyncThunk(
  "filteredPosts/filter",
  async (category: number, { rejectWithValue }) => {
    // const { category, page } = parameters;
    //так перестает работать фильтерб работает только _limit, почему, чего-то нехватает ??
    const response = await fetch(
      `http://localhost:3000/posts?${
        category > 0 ? `category=${category}` : ""
      }`
      //_limit=6&&_page=${page}
    );
    if (!response.ok) {
      return rejectWithValue("Server error");
    }
    const json = await response.json();
    return json;
  }
);

// export const fetchPizzas = createAsyncThunk<Post[], PostsParams>(
//   'pizza/fetchPizzasStatus',
//   async (params) => {
//     const { sortBy,  category,  currentPage } = params;
//     // console.log(params, 4444);
//     const { data } = await axios.get<Post[]>(`https://626d16545267c14d5677d9c2.mockapi.io/items`, {
//       params: pickBy(
//         {
//           page: currentPage,
//           limit: 6,
//           category,
//           sortBy,
//         },
//         //  identity,
//       ),
//     });

//     return data;
//   },
// );

export const filteredPostsSlice = createSlice({
  name: "filteredPosts",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<any>) => {
      state.categoryId = action.payload;
    },
    setFilter: (state, action: PayloadAction<any>) => {
      // state.currentPage= action.payload.currentPage
      state.categoryId = action.payload.categoryId;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchFilteredPosts.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.filterPosts = action.payload;
        console.log(action.payload);
      }
    );
    builder.addCase(fetchFilteredPosts.pending, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(fetchFilteredPosts.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setFilter, setCurrentPage, setCategoryId } =
  filteredPostsSlice.actions;
export default filteredPostsSlice.reducer;
