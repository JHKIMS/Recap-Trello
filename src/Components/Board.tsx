import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import { styled } from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  padding-top: 10px;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.boardColor};
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#2d3436"
      : props.isDraggingFromThis
      ? "#ced6e0"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const {} = useForm();
  return (
    <div>
      <Wrapper>
        <Title>{boardId}</Title>
        <Droppable droppableId={boardId}>
          {(magic, snapshot) => (
            <Area
              isDraggingOver={snapshot.isDraggingOver}
              isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {toDos.map((toDo, index) => (
                <DragabbleCard key={toDo} toDo={toDo} index={index} />
              ))}
              {magic.placeholder}
            </Area>
          )}
        </Droppable>
      </Wrapper>
    </div>
  );
}

export default Board;
