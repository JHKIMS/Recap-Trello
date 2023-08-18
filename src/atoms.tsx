import {atom, selector} from "recoil";

interface IToDoState{
    [key:string] : string[];
}

export const toDoState = atom<IToDoState>({
    key:"toDo",
    default:{
        to_do: ["이","것"],
        doing: ["은","기","본"],
        done: ["임"],
    },
})