import {atom} from "recoil";

interface IToDoState{
    [key:string] : ITodo[];
}

export interface ITodo{
    id: number;
    text: string;
}
export const toDoState = atom<IToDoState>({
    key:"toDo",
    default:{
        ToDo: [],
        Doing: [],
        Done: [],
    },
})
export const boardState = atom({
    key: "boardState",
    default: [],
})
export const garbageState = atom({
    key: "garbageState",
    default: [],
})
export const boardModalState = atom<boolean>({
    key: "boardModalState",
    default: false,
})