
const initalState = {
    items:[],
    filter:[]
}
export default function userItemReducer(state=initalState,action){
    switch(action.type){
        case "SHOW_ITEM":
            return {
                ...state,
                state
            }
        default:
            return state;
    }
}