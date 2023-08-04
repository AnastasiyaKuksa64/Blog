import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getItem } from "../utils/localStorage";
import axios from "axios";

type Post = {
  date: string;
  title: string;
  discription: string;
  src: string;
  category: number;
  rating: number | any;
  id: string;
};

export type Sort = {
  name: string;
  sortProperty: string;
};

type PostsState = {
  posts: Post[];
  favourites: Post[];
  post: null | Post;
  status: string;
};

type fetchType = {
  categoryId: number;
  sort: Sort;
  currentPage: number;
  search: string;
};

const initialState: PostsState = {
  posts: [],
  favourites: getItem("favoutites") || [],
  post: null,
  status: "loading", // loading, success, error
};

export const fetchPost = createAsyncThunk(
  "posts/Posts",
  async (parameters: fetchType, thunkAPI) => {
    const { categoryId, search, sort, currentPage } = parameters;
    const { data } = await axios.get(
      `http://localhost:3000/posts?_page=${currentPage}}&_limit=6&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&_sort=${sort.sortProperty.replace("-", "")}&_order=${
        sort.sortProperty.includes("-") ? "asc" : "desc"
      }${search}`
    );
    return data;
  }
);

export const fetchPostById = createAsyncThunk(
  "post/PostById",
  async (id: string | undefined, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:3000/posts/${id}`);

    if (!response.ok) {
      return rejectWithValue("error open post");
    }

    const json = await response.json();
    return json;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<any>) => {
      const post = action.payload;
      state.favourites = [...state.favourites, post];
      let tostring = JSON.stringify(state.favourites);
      localStorage.setItem("favoutites", tostring);
    },
    delitemarksFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(
        (item) => item.id !== action.payload
      );
      let tostring = JSON.stringify(state.favourites);
      localStorage.setItem("favoutites", tostring);
    },
    deliteAllFavourite: (state, action: PayloadAction<any>) => {
      state.favourites = [];
      let tostring = JSON.stringify(state.favourites);
      localStorage.setItem("favoutites", tostring);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.post = action.payload;
    });
    builder.addCase(fetchPostById.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(fetchPostById.pending, (state, action) => {
      state.status = "pending";
    });
    //[fetchPost.fulfilled]:(state, action) =>{
    // }
    builder.addCase(fetchPost.pending, (state, action) => {
      state.status = "loading";
      state.posts = [];
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.status = "error";
      state.posts = [];
    });
  },
});

export const selectPosts = (state: any) => state.posts;

export const { addFavourite, delitemarksFavourite, deliteAllFavourite } =
  postsSlice.actions;
export default postsSlice.reducer;
