import React from "react";
import styled from "styled-components";
import SongDetail from "./components/SongDetail";
import ProgressArea, { AudioRefHandle } from "./components/ProgressArea";
import Controls from "./components/Controls";
import Playlist from "./components/Playlist";
import palette from "./styles/palette";

const Container = styled.div`
  width: 500px;
  padding: 25px 30px;
  overflow: hidden;
  position: relative;
  border-radius: 15px;
  border: 2px solid black;
  background: ${palette.white};
`;

const App: React.FC = () => {
  // AudioRefHandle: play, pause, changeVolume
  const ref = React.createRef<AudioRefHandle>();

  const onPlay = () => {
    ref.current!.play();
  };

  const onPause = () => {
    ref.current!.pause();
  };

  const onChangeVolume = (volume: any) => {
    // 실제로 볼륨을 조절하는 요소
    ref.current!.changeVolume(volume);
  };

  return (
    <Container>
      <SongDetail />
      <ProgressArea ref={ref} />
      <Controls play={onPlay} pause={onPause} changeVolume={onChangeVolume} />
      <Playlist />
    </Container>
  );
};

export default App;
