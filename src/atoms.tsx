import {atom, selector} from "recoil";

export const toDoState = atom({
    key:"toDo",
    default:["이", "것", "은", "기", "본", "임"],
})