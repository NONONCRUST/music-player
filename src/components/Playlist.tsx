import React from "react";
import styled from "styled-components";
import QueueMusic from "@mui/icons-material/QueueMusic";
import Close from "@mui/icons-material/Close";
import PlaylistItem from "./PlaylistItem";
import playlist from "../store/data";
import palette from "../styles/palette";

const Container = styled.div`
  .play-list {
    .header,
    ul li {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    position: absolute;
    background: ${palette.white};
    width: 100%;
    left: 0;
    bottom: -55%;
    opacity: 0;
    z-index: 5;
    padding: 15px 30px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.15s ease-out;

    &.show {
      bottom: 0;
      opacity: 1;
      pointer-events: auto;
    }

    .header .row {
      display: flex;
      align-items: center;
      font-size: 19px;

      span {
        margin-left: 5px;
      }
    }

    ul {
      margin: 10px 0;
      max-height: 260px;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0px;
      }

      li {
        list-style: none;
        display: flex;
        cursor: pointer;
        padding-bottom: 10px;
        margin-bottom: 5px;
        border-bottom: 1px solid #e5e5e5;

        &:last-child {
          border-bottom: 0px;
        }

        .row {
          span {
            font-size: 17px;
          }

          p {
            opacity: 0.9;
          }
        }

        .music-duration {
          font-size: 16px;
        }

        .row.playing,
        .music-duration.playing {
          color: ${palette.green};
        }
      }
    }
  }
`;

interface Props {
  showMusicList?: any;
  setShowMusicList?: any;
}

const Playlist: React.FC<Props> = ({ showMusicList, setShowMusicList }) => {
  return (
    <Container>
      <div className="play-list">
        <div className="header">
          <div className="row">
            <QueueMusic className="list" />
            <span>Playlist</span>
          </div>
          <Close sx={{ fontSize: 22, cursor: "pointer" }} />
        </div>
        <ul></ul>
      </div>
    </Container>
  );
};

export default Playlist;
