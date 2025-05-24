// seller login
export const sellerLogin = () => {
  try {

  } catch (err) {
    return handleException(err);
  }
}

// seller logout
export const sellerLogout = () => {
  try {

  } catch (err) {

  }
}

// seller signin
export const sellerSignIn = () => {
  try {

  } catch (err) {

  }
}

// seller signout
export const sellerSignOut = () => {
  try {

  } catch (err) {

  }
}

// seller forgot password
export const sellerForgotPassword = () => {
  try {

  } catch (err) {

  }
}

// seller exception
function handleException(err: Error | unknown) {
  if (err instanceof Error) {
    console.log("Something happend", err.message);
    throw new Error(err.message);
  } else {
    console.log("Something happend", err);
    throw new Error("Something happend" + err);
  }
}