//  import loginService from "../../services/login";
//  const initialState = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;

//  const loginReducer = (state = null, action) => {
//     switch (action.type) {
//       case "LOGIN":
//          return action.data;
//       case "LOGOUT":
//          return null;
//       default:
//          return state;
//     }
//      }

// // // export const setUserInfo = (user) => {
// // //     return async (dispatch) => {
// // //     const user=await loginService.getAll()
// // //        dispatch({
// //           type: "LOGIN",
// //           data: user,
// // //        });
// // //     };
// // //  }


// export const setUserInfo=(user)=>{
//     return async dispatch=>{
//         const loggedinuser=await loginService.login(user.username,user.password)
//         dispatch({
//             type: "LOGIN",
//             data: user,
//         })
//     }
// }
// export default loginReducer;



const initialState = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;

const loginReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_USER':
      return action.user;
    default:
      return state;
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export default loginReducer;
