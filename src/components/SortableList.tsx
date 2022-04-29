import React, { useCallback, useState } from "react";
import styled from "styled-components";
import SortableListItems from "./SortableListItems";

const Container = styled.div`
  ul,
  li {
    list-style-type: none;
  }
`;

interface Props {
  data: object[];
  onDropItem: (newListData: object[]) => void;
  onClickItem: (index: number) => void;
  renderItem: (
    item: { name: string; artist: string },
    index: number
  ) => JSX.Element;
}

const SortableList: React.FC<Props> = ({
  data,
  onDropItem,
  onClickItem,
  renderItem,
}) => {
  const [startIndex, setStartIndex] = useState<any>(null);
  const [listData, setListData] = useState<any>(data);

  const onDragStart = (index: number) => {
    setStartIndex(index);
  };

  const onDrop = useCallback(
    (dropIndex: number) => {
      const dragItem = listData[startIndex];
      const list = [...listData];
      list.splice(startIndex, 1);
      const newListData =
        startIndex < dropIndex
          ? [
              ...list.slice(0, dropIndex - 1),
              dragItem,
              ...list.slice(dropIndex - 1, list.length),
            ]
          : [
              ...list.slice(0, dropIndex),
              dragItem,
              ...list.slice(dropIndex, list.length),
            ];
      setListData(newListData);
      onDropItem(newListData);
    },
    [startIndex, listData, onDropItem]
  );

  return (
    <Container>
      <ul>
        {listData.map((item: any, index: number) => (
          <SortableListItems
            key={index}
            index={index}
            draggable={true}
            onDragStart={onDragStart}
            onDropItem={onDrop}
            onClickItem={onClickItem}
          >
            {renderItem(item, index)}
          </SortableListItems>
        ))}
        <SortableListItems
          key={listData.length}
          index={listData.length}
          draggable={false}
          onDropItem={onDrop}
        />
      </ul>
    </Container>
  );
};

export default SortableList;
