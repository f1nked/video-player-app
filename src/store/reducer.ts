import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Zone {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Event {
  timestamp: number;
  duration: number;
  zone: Zone;
}

interface VideoState {
  events: Event[];
  loading: boolean;
  error: string | null;
  currentTime: number;
  isPlaying: boolean;
}

const initialState: VideoState = {
  events: [],
  loading: false,
  error: null,
  currentTime: 0,
  isPlaying: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    fetchEventsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess: (state, action: PayloadAction<Event[]>) => {
      state.loading = false;
      state.events = action.payload;
    },
    fetchEventsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { setCurrentTime, fetchEventsRequest, fetchEventsSuccess, fetchEventsFailure, togglePlay } = videoSlice.actions;
export default videoSlice.reducer;
