import React from "react";
import styled from "styled-components";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import palette from "../styles/palette";
import { useDispatch, useSelector } from "../store";
import {
  nextMusic,
  prevMusic,
  toggleRepeatType,
} from "../store/musicPlayerSlice";

const Container = styled.div`
  .control-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 40px 0 5px 0;

    .volume-container {
      display: flex;
      align-items: center;

      // 볼륨 슬라이더
      input {
        &[type="range"] {
          width: 75px;
          -webkit-appearance: none;
          height: 4px;
          background-color: ${palette.green};
          outline-color: transparent;
        }

        &:focus {
          outline-color: transparent;
        }

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          background-color: ${palette.green};
          border-radius: 12px;
          overflow: visible;
        }
      }
    }
  }
`;

interface ControlsProps {
  showMusicList?: any;
  setShowMusicList?: any;
  resetDuration?: any;
  play: () => void;
  pause: () => void;
  changeVolume: (volume: any) => void;
}

interface RepeatButtonProps {
  repeatType: string;
  onClick: () => void;
}

const RepeatButton: React.FC<RepeatButtonProps> = ({
  repeatType,
  ...props
}) => {
  switch (repeatType) {
    case "ALL":
      return <RepeatIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />;
    case "ONE":
      return (
        <RepeatOneIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />
      );
    case "SHUFFLE":
      return (
        <ShuffleIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />
      );
    default:
      return null;
  }
};

const Controls: React.FC<ControlsProps> = ({
  showMusicList,
  setShowMusicList,
  resetDuration,
  play,
  pause,
  changeVolume,
}) => {
  const dispatch = useDispatch();

  const { isPlaying, repeatType } = useSelector((state) => state.musicPlayer);

  const onClickPlay = () => {
    play();
  };

  const onClickPause = () => {
    pause();
  };

  const onChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeVolume(event.target.value);
  };

  const onClickPrev = () => {
    dispatch(prevMusic());
  };

  const onClickNext = () => {
    dispatch(nextMusic());
  };

  const onClickRepeat = () => {
    dispatch(toggleRepeatType());
  };

  return (
    <Container>
      <div className="control-area">
        <QueueMusicIcon sx={{ fontSize: 30, cursor: "pointer" }} />
        <RepeatButton repeatType={repeatType} onClick={onClickRepeat} />

        <SkipPreviousIcon
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPrev}
        />
        {isPlaying ? (
          <PauseIcon
            sx={{ fontSize: 30, cursor: "pointer" }}
            onClick={onClickPause}
          />
        ) : (
          <PlayArrowIcon
            sx={{ fontSize: 30, cursor: "pointer" }}
            onClick={onClickPlay}
          />
        )}
        <SkipNextIcon
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickNext}
        />
        <div className="volume-container">
          <VolumeUpIcon sx={{ fontSize: 20 }} />
          <input
            type="range"
            style={{ cursor: "pointer" }}
            defaultValue={1}
            onChange={onChangeVolume}
            min="0"
            max="1"
            step="0.1"
          />
        </div>
      </div>
    </Container>
  );
};

export default Controls;
