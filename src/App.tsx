import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 900px;
  margin: 0 auto;
  justify-content: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: calc(100vw - 4rem);
  margin-right: 2rem;
  height: calc(100vh - 10rem);
  margin-top: 3rem;
  margin-left: 2rem;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  transition: color 0.3s;
  color: white;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        console.log(boardCopy);
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        console.log(boardCopy);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // CrossBoard Movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]; // 이동의 시작점인 Board을 알 수 있다.
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]]; // 이동이 끝나는 Board
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <>
      <Title>Today_List</Title>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
