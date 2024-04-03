export const createUser = async (userData) => {
  const response = await fetch("/auth/signup", {
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
    const response = await fetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(loggedData),
    headers: { "Content-Type": "application/json" },
  });
    if (response.ok) {
      const data = await response.json();
      return { data };
    }else{
      const error = await response.text();
      return (error)
    }
  } catch (error) {
    return ({message: "404, the page you are looking for is not found"});
  }
};

export const checkUser = async () => {
  try {
    const response = await fetch("/auth/check");
    if (response.ok) {
      const data = await response.json();
      return { data };
    }else{
      const error = await response.text();
      return (error)
    }
  } catch (error) {
    return ({message: "404, the page you are looking for is not found"});
  }
};

export const signOutUser = async (loggedData) => {
  const response = await fetch(loggedData);
  return { data: { response } };
};
