export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";

export function addToDo(toDo) {
    return {
        type: ADD_TODO,
        payload: toDo
    }
}
export function deleteTodo(toDo) {
    return {
        type: DELETE_TODO,
        payload: toDo
    }
}
export function updateToDO(toDo) {
    return {
        type: UPDATE_TODO,
        payload: toDo
    }
}
