import React from "react";

interface Props {
  item: {
    name: string;
    artist: string;
  };
  index: number;
}

const PlaylistItem: React.FC<Props> = ({ item, index }) => {
  return (
    <>
      <div className="row">
        <span>{item.name}</span>
        <p>{item.artist}</p>
      </div>
      <span className="audio-duration">00:00</span>
    </>
  );
};

export default PlaylistItem;
