export const createUser = async (userData) => {
  const response = await fetch("http://localhost:8080/users", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

// to check the entered login details with available data
export const checkUser = async (loggedData) => {
  const email = await loggedData.email;
  const password = await loggedData.password;
  try {
    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();
    if (data.length) {
      if (password === data[0].password) {
        return { data: data[0] };
      } else {
        return { message: "incorrect email or passowrd" };
      }
    } else {
      return { message: "incorrect email or passowrd" };
    }
  } catch (error) {
    return { message: "server not available" };
  }
};

export const signOutUser = async(loggedData)=>{
  const response = await fetch(loggedData)
  return{data:{response}}
} 