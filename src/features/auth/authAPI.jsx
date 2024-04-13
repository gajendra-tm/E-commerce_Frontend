export const createUser = async (userData) => {
  const response = await fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

// to check the entered login details with available data
export const loginUser = async (loggedData) => {
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify(loggedData),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const error = await response.text();
      return error;
    }
  } catch (error) {
    return { message: "404, the page you are looking for is not found" };
  }
};

export const checkUser = async () => {
  try {
    const response = await fetch("http://localhost:8080/auth/check");
    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const error = await response.text();
      return error;
    }
  } catch (error) {
    return { message: "404, the page you are looking for is not found" };
  }
};

export const signOutUser = async () => {
  const response = await fetch("http://localhost:8080/auth/signout");
  try {
    if(response.ok){
    return {data:"success"}; // we are not returning response because the response is going to be empty anyway
  }else{
    const error = await response.text();
    return error;
  }
  } catch (error) {
    return {message: "404, the page you are looking for is not found"}
  }
};

//password  reset request
export const resetPasswordRequest = async (email) => {
  try {
    const response = await fetch(
      "http://localhost:8080/auth/reset-password-request",
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const error = await response.text();
      return error;
    }
  } catch (error) {
    return { message: "404, the page you are looking for is not found" };
  }
};

//password resetting
export const resetPassword = async (data) => {
  try {
    const response = await fetch("http://localhost:8080/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const error = await response.text();
      return error;
    }
  } catch (error) {
    return { message: "404, the page you are looking for is not found" };
  }
};
