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
export const checkUser = async (loggedData) => {
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify(loggedData),
      headers: { "content-type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      return { data };
    }else{
      const error = await response.json();
      return (error)
    }
  } catch (error) {
    return ({message: "the page you are looking for is not found"});
  }
};

export const signOutUser = async (loggedData) => {
  const response = await fetch(loggedData);
  return { data: { response } };
};
