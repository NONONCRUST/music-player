import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandomNum } from "../lib/utils";
import playlist from "./data";

interface musicPlayerState {
  playlist: {
    name: string;
    artist: string;
    img: string;
    src: string;
    id: number;
  }[];
  currentMusicId: number;
  currentIndex: number;
  isPlaying: boolean;
  repeatType: string;
}

const initialState: musicPlayerState = {
  playlist: playlist,
  currentMusicId: playlist[0].id,
  currentIndex: 0,
  isPlaying: false,
  repeatType: "ALL",
};

export const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    playMusic(state, action: PayloadAction) {
      state.isPlaying = true;
      return state;
    },
    stopMusic(state, action: PayloadAction) {
      state.isPlaying = false;
      return state;
    },
    nextMusic(state, action: PayloadAction) {
      // 마지막 인덱스이면 맨 처음 인덱스로 돌아감
      const nextIndex =
        state.repeatType === "SHUFFLE"
          ? getRandomNum(
              // playlist 배열로부터 [0, 1, 2, 3, 4]와 같은 배열 생성
              Array.from(Array(playlist.length).keys()),
              state.currentIndex
            )
          : (state.currentIndex + 1) % state.playlist.length;
      state.currentIndex = nextIndex;
      state.currentMusicId = state.playlist[nextIndex].id;
      return state;
    },
    prevMusic(state, action: PayloadAction) {
      // 0번째 인덱스이면 마지막 인덱스로 돌아감
      const prevIndex =
        state.repeatType === "SHUFFLE"
          ? getRandomNum(
              Array.from(Array(playlist.length).keys()),
              state.currentIndex
            )
          : (state.currentIndex - 1 + state.playlist.length) %
            state.playlist.length;
      state.currentIndex = prevIndex;
      state.currentMusicId = state.playlist[prevIndex].id;
    },
    toggleRepeatType(state, action: PayloadAction) {
      const repeatType = ["ALL", "ONE", "SHUFFLE"];
      // 배열을 순환하도록 함
      state.repeatType =
        repeatType[(repeatType.indexOf(state.repeatType) + 1) % 3];
      return state;
    },
    setCurrentIndexAndId(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
      state.currentMusicId = state.playlist[action.payload].id;
      return state;
    },
    updatePlaylist(state, action: PayloadAction<any>) {
      state.playlist = action.payload;
      state.currentIndex = action.payload.findIndex(
        (music: any) => music.id === state.currentMusicId
      );
      return state;
    },
  },
});

export const {
  playMusic,
  stopMusic,
  nextMusic,
  prevMusic,
  toggleRepeatType,
  setCurrentIndexAndId,
  updatePlaylist,
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
