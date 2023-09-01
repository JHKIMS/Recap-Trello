import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlusCircle, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
library.add(faPlusSquare, faPlusCircle);

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

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 20px;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  transition: color 0.3s;
  color: white;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 5px;
`;
const Button = styled.button`
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  width: 2rem;
  height: 2rem;
  background: none;
  padding: 0;
  svg {
    height: 30px;
  }
`;
const Trash = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  svg {
    height: 30px;
  }
`;
const NewBoard = styled.div`
`

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
  const test = () => {
    console.log("박스 안 생김?");
  };
  return (
    <>
      <NavContainer>
        <Title>Today_List</Title>
        <BtnContainer>
          <Button onClick={test}>
            <svg
              width="512"
              height="512"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffffff"
                d="M18 20v-3h-3v-2h3v-3h2v3h3v2h-3v3h-2ZM3 21q-.825 0-1.413-.588T1 19V5q0-.825.588-1.413T3 3h14q.825 0 1.413.588T19 5v5h-2V8H3v11h13v2H3ZM3 6h14V5H3v1Zm0 0V5v1Z"
              />
            </svg>
          </Button>
          <Trash>
            <svg
              width="512"
              height="512"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
              />
            </svg>
          </Trash>
        </BtnContainer>
      </NavContainer>

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
