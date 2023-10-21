import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};


export const login = (user) => async (dispatch) => {
  try {


    const { credential, password } = user;

    const response = await csrfFetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential,
        password,
      }),
    });


    // Convert the response to JSON immediately after receiving it
    const responseData = await response.json();

    if (!response.ok) {
      if (responseData.errors) {
          console.error("Login failed with errors:", responseData.errors);
          return { errors: responseData.errors };
      } else {
          console.error("Other error occurred:", responseData);
          return { errors: ["An unexpected error occurred."] };
      }
    } else {
      dispatch(setUser(responseData.user));
      return { user: responseData.user };
    }
  } catch (err) {
    console.error("Error caught:", err);
    if (err.status === 401) {
      return { errors: ['Check your login information and try again'] };
    } else {
     return { errors: ['An unexpected error has occurred please try again'] };
    }


  }
};

export const signUp = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password} = user;
  let data;

  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });

  if (response.headers.get("Content-Type")?.includes("application/json")) {
    data = await response.json();
  } else {
    data = { errors: ["Unexpected server response."] };
  }

  if (response.ok) {
    dispatch(setUser(data.user));
    return { errors: [], user: data.user };
  } else {
    return { errors: data.errors || ["An unexpected error occurred."] };
  }
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();

    dispatch(setUser(data.user));
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};


export default sessionReducer;
