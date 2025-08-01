const initialState={
    employee:[],
    allEmployees:[],
    records:[]
};

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case "SET_USERS":
            return{
                ...state,
                employees:action.payload,
                allEmployees:action.payload,
                records:action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;










