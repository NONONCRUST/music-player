import React, { useRef } from "react";

interface Props {
  index: number;
  draggable: boolean;
  children?: any;
  onDragStart?: (index: number) => void;
  onDropItem: (index: number) => void;
  onClickItem?: (index: number) => void;
}

const SortableListItems: React.FC<Props> = ({
  index,
  draggable,
  children,
  onDragStart,
  onDropItem,
  onClickItem,
}) => {
  const itemRef = useRef<any>(null);

  const onDragStartItem = () => {
    itemRef.current.classList.add("drag-start");
    if (onDragStart) {
      onDragStart(index);
    }
  };

  const onDragEndItem = () => {
    itemRef.current.classList.remove("drag-start");
  };

  const onDragEnter = () => {
    itemRef.current.classList.add("drag-over");
  };

  const onDragLeave = () => {
    itemRef.current.classList.remove("drag-over");
  };

  const onDragOver = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  const onDrop = () => {
    itemRef.current.classList.remove("drag-over");
    onDropItem(index);
  };

  const onClick = () => {
    if (onClickItem) {
      onClickItem(index);
    }
  };

  return (
    <li
      ref={itemRef}
      className="item"
      draggable={draggable}
      onDragStart={onDragStartItem}
      onDragEnd={onDragEndItem}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default SortableListItems;
