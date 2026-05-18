import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../services/api";

/* =========================
   GET ALL TEMPLES
========================= */

export const fetchTemples = createAsyncThunk(
  "temple/fetchTemples",

  async ({ page = 1, keyword = "", category = "", state = "" }, thunkAPI) => {
    try {
      const { data } = await API.get(
        `/temples?page=${page}&keyword=${keyword}&category=${category}&state=${state}`,
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

/* =========================
   GET SINGLE TEMPLE
========================= */

export const fetchTempleById = createAsyncThunk(
  "temple/fetchTempleById",

  async (id, thunkAPI) => {
    try {
      const { data } = await API.get(`/temples/${id}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

/* =========================
   CREATE TEMPLE
========================= */

export const createTemple = createAsyncThunk(
  "temple/createTemple",

  async (formData, thunkAPI) => {
    try {
      const { data } = await API.post("/temples", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

/* =========================
   UPDATE TEMPLE
========================= */

export const updateTemple = createAsyncThunk(
  "temple/updateTemple",

  async ({ id, formData }, thunkAPI) => {
    try {
      const { data } = await API.put(`/temples/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

/* =========================
   DELETE TEMPLE
========================= */

export const deleteTemple = createAsyncThunk(
  "temple/deleteTemple",

  async (id, thunkAPI) => {
    try {
      await API.delete(`/temples/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

/* =========================
   INITIAL STATE
========================= */

const initialState = {
  temples: [],

  temple: null,

  loading: false,

  error: null,

  success: false,

  page: 1,

  totalPages: 1,
};

/* =========================
   SLICE
========================= */

const templeSlice = createSlice({
  name: "temple",

  initialState,

  reducers: {
    clearTempleError: (state) => {
      state.error = null;
    },

    clearTempleSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    /* =========================
         FETCH TEMPLES
      ========================= */

    builder
      .addCase(fetchTemples.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTemples.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.page === 1) {
          state.temples = action.payload.temples;
        } else {
          state.temples = [...state.temples, ...action.payload.temples];
        }

        state.page = action.payload.page;

        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchTemples.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    /* =========================
         FETCH SINGLE TEMPLE
      ========================= */

    builder
      .addCase(fetchTempleById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTempleById.fulfilled, (state, action) => {
        state.loading = false;

        state.temple = action.payload;
      })

      .addCase(fetchTempleById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    /* =========================
         CREATE TEMPLE
      ========================= */

    builder
      .addCase(createTemple.pending, (state) => {
        state.loading = true;
      })

      .addCase(createTemple.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.temples.unshift(action.payload);
      })

      .addCase(createTemple.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    /* =========================
         UPDATE TEMPLE
      ========================= */

    builder
      .addCase(updateTemple.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateTemple.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.temples = state.temples.map((temple) =>
          temple._id === action.payload._id ? action.payload : temple,
        );

        state.temple = action.payload;
      })

      .addCase(updateTemple.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    /* =========================
         DELETE TEMPLE
      ========================= */

    builder
      .addCase(deleteTemple.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteTemple.fulfilled, (state, action) => {
        state.loading = false;

        state.temples = state.temples.filter(
          (temple) => temple._id !== action.payload,
        );
      })

      .addCase(deleteTemple.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

/* =========================
   EXPORTS
========================= */

export const { clearTempleError, clearTempleSuccess } = templeSlice.actions;

export default templeSlice.reducer;
