// export const setUsersByPage=(page,users)=>({
//     type:"SET_USERS_BY_PAGE",
//     payload:{page,users}
// });

export const setAllEmployees=(users)=>({
    type:"SET_ALL_EMPLOYEES",
    payload:users
})

export const setCurrentPage=(page)=>({
    type:"SET_CURRENT_PAGE",
    payload:page
});

export const setTotalUsers=(total)=>({
    type:"SET_TOTAL_USERS",
    payload:total
});