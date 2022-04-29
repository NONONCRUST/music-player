import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { getDuration } from "../lib/utils";
import { useSelector } from "../store";
import palette from "../styles/palette";

interface ContainerProps {
  currentIndex: number;
  index: number;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .music-duration {
    display: flex;
    align-items: center;
  }

  ${({ currentIndex, index }) =>
    currentIndex === index &&
    css`
      .row {
        color: ${palette.green};
      }
      .music-duration {
        color: ${palette.green};
      }
    `};
`;

interface Props {
  item: {
    name: string;
    artist: string;
    src: string;
  };
  index: number;
}

const PlaylistItem: React.FC<Props> = ({ item, index }) => {
  const [duration, setDuration] = useState<any>("00:00");

  const currentIndex = useSelector((state) => state.musicPlayer.currentIndex);

  useEffect(() => {
    // useEffect 내에서 async 함수를 정의하고 호출할 수 있음
    const formatTime = async () => {
      const durationTime = await getDuration(item.src);
      setDuration(durationTime);
    };
    formatTime();
  }, [item.src]);

  return (
    <Container currentIndex={currentIndex} index={index}>
      <div className="row">
        <span>{item.name}</span>
        <p>{item.artist}</p>
      </div>
      <span className="music-duration">{duration}</span>
    </Container>
  );
};

export default PlaylistItem;
