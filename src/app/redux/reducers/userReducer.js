const initialState={
    pages:{},
    currentPage:1,
    total:0,
};

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case "SET_USERS_BY_PAGE":
            return{
                ...state,
                pages:{
                    ...state.pages,
                    [action.payload.page]:action.payload.users
                }
            };
        case "SET_CURRENT_PAGE":
            return{
                ...state,
                currentPage:action.payload
            };
        case "SET_TOTAL_USERS":
            return{
                ...state,
                total:action.payload
            }
        default:
            return state;
    }
};

export default userReducer;










