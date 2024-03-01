export const fetchLoggedInUserOrders = async(userId)=>{
    const response = await fetch("http://localhost:8080/orders/user/"+userId);
    const data = await response.json();
    return {data};
};

export const fetchLoggedInUserInfo= async(userId)=>{
    const response = await fetch("http://localhost:8080/users/"+userId);
    const data = await response.json();
    return {data};
};

export const updateUser = async (updatedData)=>{
    const response = await fetch("http://localhost:8080/users/"+updatedData.id,{
      method:"PATCH",
      body:JSON.stringify(updatedData),
      headers:{"Content-type":"application/json"}
    });
    const data = await response.json();
    return {data};
  };