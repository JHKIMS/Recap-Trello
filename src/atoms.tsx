import {atom, selector} from "recoil";

interface IToDoState{
    [key:string] : string[];
}

export const toDoState = atom<IToDoState>({
    key:"toDo",
    default:{
        ToDo: ["이","것"],
        Doing: ["은","기","본"],
        Done: ["임"],
    },
})