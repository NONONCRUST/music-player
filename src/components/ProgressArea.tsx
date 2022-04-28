import React, { useRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "../store";
import { nextMusic, playMusic, stopMusic } from "../store/musicPlayerSlice";
import palette from "../styles/palette";

const Container = styled.div`
  .progress-area {
    height: 7px;
    width: 100%;
    border-radius: 50px;
    background: #e6e6e6;
    cursor: pointer;

    .music-timer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 2px;
      span {
        font-size: 15px;
      }
    }

    .progress-bar {
      height: inherit;
      width: 0%;
      position: relative;
      border-radius: inherit;
      background: ${palette.blue};
    }
  }
`;

export type AudioRefHandle = {
  play: () => void;
  pause: () => void;
  changeVolume: (volume: any) => void;
};

// forwardRef를 사용하는 컴포넌트는 React.FC 생략 (타입스크립트)
const ProgressArea = React.forwardRef<AudioRefHandle>((_, ref) => {
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  const dispatch = useDispatch();

  const { playlist, currentIndex } = useSelector((state) => state.musicPlayer);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // 여기서 정의한 메소드를 App.tsx에서 ref.current.play()와 같이 사용할 수 있음
  useImperativeHandle(ref, () => ({
    play: () => {
      audioRef.current!.play();
    },
    pause: () => {
      audioRef.current!.pause();
    },
    changeVolume: (volume: any) => {
      audioRef.current!.volume = volume;
    },
  }));

  const onPlay = () => {
    dispatch(playMusic());
  };

  const onPause = () => {
    dispatch(stopMusic());
  };

  // 노래가 끝났을 때
  const onEnded = () => {
    dispatch(nextMusic());
  };

  // 소수점인 시간을 00:00 과 같은 형태로 바꿔줌
  const formatTime = (time: number) => {
    const minute = `0${parseInt(String(time / 60), 10)}`;
    const second = `0${parseInt(String(time % 60))}`;
    return `${minute}:${second.slice(-2)}`;
  };

  const onMouseDownProgressBar = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBarWidth = event.currentTarget.clientWidth;
    const offsetX = event.nativeEvent.offsetX;
    const duration = audioRef.current!.duration;
    // currentTime만 업데이트해주면 progressBar 위치도 자동으로 업데이트됨
    audioRef.current!.currentTime = (offsetX / progressBarWidth) * duration;
  };

  // audio의 onTimeUpdate 속성
  const onTimeUpdate = (event: React.ChangeEvent<HTMLAudioElement>) => {
    if (event.target.readyState === 0) return;
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    const progressBarWidth = (currentTime / duration) * 100;

    progressBarRef.current!.style.width = `${progressBarWidth}%`;

    setCurrentTime(formatTime(currentTime));
    setDuration(formatTime(duration));
  };

  return (
    <Container>
      <div className="progress-area" onMouseDown={onMouseDownProgressBar}>
        <div className="progress-bar" ref={progressBarRef}>
          <audio
            ref={audioRef}
            src={playlist[currentIndex].src}
            onTimeUpdate={onTimeUpdate}
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onEnded}
            autoPlay
          ></audio>
        </div>
        <div className="music-timer">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      </div>
    </Container>
  );
});

export default ProgressArea;
