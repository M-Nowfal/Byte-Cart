// user login
export const userLogin = () => {
  try {

  } catch (err) {
    return handleException(err);
  }
}

// user logout
export const userLogout = () => {
  try {

  } catch (err) {

  }
}

// user signin
export const userSignIn = () => {
  try {

  } catch (err) {

  }
}

// user signout
export const userSignOut = () => {
  try {

  } catch (err) {

  }
}

// user forgot password
export const userForgotPassword = () => {
  try {

  } catch (err) {

  }
}

// user exception
function handleException(err: Error | unknown) {
  if (err instanceof Error) {
    console.log("Something happend", err.message);
    throw new Error(err.message);
  } else {
    console.log("Something happend", err);
    throw new Error("Something happend" + err);
  }
}