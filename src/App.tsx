import React, { useCallback, useState } from "react";
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
  const [showPlaylist, setShowPlaylist] = useState(false);

  // AudioRefHandle: play, pause, changeVolume
  const ref = React.createRef<AudioRefHandle>();

  const onPlay = useCallback(() => {
    ref.current!.play();
  }, [ref]);

  const onPause = useCallback(() => {
    ref.current!.pause();
  }, [ref]);

  // volume 타입 지정 해야함
  const onChangeVolume = useCallback(
    (volume: any) => {
      // 실제로 음악 볼륨을 조절하는 속성
      ref.current!.changeVolume(volume);
    },
    [ref]
  );

  return (
    <Container>
      <SongDetail />
      <ProgressArea ref={ref} />
      <Controls
        play={onPlay}
        pause={onPause}
        changeVolume={onChangeVolume}
        setShowPlaylist={setShowPlaylist}
      />
      {showPlaylist && <Playlist setShowPlaylist={setShowPlaylist} />}
    </Container>
  );
};

export default App;
