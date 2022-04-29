import React, { useCallback } from "react";
import styled from "styled-components";
import QueueMusic from "@mui/icons-material/QueueMusic";
import Close from "@mui/icons-material/Close";
import PlaylistItem from "./PlaylistItem";
import palette from "../styles/palette";
import { useDispatch, useSelector } from "../store";
import SortableList from "./SortableList";
import {
  setCurrentIndexAndId,
  updatePlaylist,
} from "../store/musicPlayerSlice";

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
    z-index: 5;
    padding: 15px 30px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.15s ease-out;
    bottom: 0;
    opacity: 1;
    pointer-events: auto;

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
      }
    }
  }
`;

interface Props {
  setShowPlaylist: (showPlaylist: boolean) => void;
}

const Playlist: React.FC<Props> = ({ setShowPlaylist }) => {
  const playlist = useSelector((state) => state.musicPlayer.playlist);

  const dispatch = useDispatch();

  const onClickCloseIcon = useCallback(() => {
    setShowPlaylist(false);
  }, [setShowPlaylist]);

  const onClickItem = useCallback(
    (index: number) => {
      dispatch(setCurrentIndexAndId(index));
    },
    [dispatch]
  );

  const onDropItem = useCallback(
    (newPlaylist: any) => {
      dispatch(updatePlaylist(newPlaylist));
    },
    [dispatch]
  );

  const renderItem = useCallback(
    (item: { name: string; artist: string; src: string }, index: number) => (
      <PlaylistItem item={item} index={index} />
    ),
    []
  );

  return (
    <Container>
      <div className="play-list">
        <div className="header">
          <div className="row">
            <QueueMusic className="list" />
            <span>Playlist</span>
          </div>
          <Close
            sx={{ fontSize: 22, cursor: "pointer" }}
            onClick={onClickCloseIcon}
          />
        </div>
        <SortableList
          data={playlist}
          renderItem={renderItem}
          onClickItem={onClickItem}
          onDropItem={onDropItem}
        />
      </div>
    </Container>
  );
};

export default React.memo(Playlist);
