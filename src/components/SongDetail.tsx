import React from "react";
import styled from "styled-components";
import { useSelector } from "../store";

const Container = styled.div`
  .header {
    display: flex;
    justify-content: center;

    span {
      font-size: 18px;
    }
  }

  .img-area {
    width: 100%;
    height: 256px;
    overflow: hidden;
    margin-top: 25px;
    border-radius: 15px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .music-info {
    text-align: center;
    margin: 30px 0;

    .song {
      font-size: 23px;
    }

    .artist {
      font-size: 19px;
      line-height: 30px;
    }
  }
`;

const SongDetail: React.FC = () => {
  const { isPlaying, playlist, currentIndex } = useSelector(
    (state) => state.musicPlayer
  );

  return (
    <Container>
      <div className="header">
        <span>{isPlaying ? "Now Playing..." : "Music Player"}</span>
      </div>
      <div className="img-area">
        <img
          src={playlist[currentIndex].img}
          alt={playlist[currentIndex].name}
        />
      </div>
      <div className="music-info">
        <p className="song">{playlist[currentIndex].name}</p>
        <p className="artist">{playlist[currentIndex].artist}</p>
      </div>
    </Container>
  );
};

export default React.memo(SongDetail);
