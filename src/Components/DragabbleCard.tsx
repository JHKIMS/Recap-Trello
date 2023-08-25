import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";

const Card = styled.div<{isDragging: boolean}>`
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.isDragging ? "#ced6e0" : props.theme.cardColor};
`;
interface IDraggableCardProps{
    toDo: string;
    index: number;
}

function DraggableCard({toDo, index}:IDraggableCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <Card
        isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
