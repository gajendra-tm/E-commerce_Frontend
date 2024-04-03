export const fetchLoggedInUserOrders = async()=>{
    const response = await fetch("/orders/user/");
    const data = await response.json();
    return {data};
};

export const fetchLoggedInUserInfo= async()=>{
    const response = await fetch("/users/own");
    const data = await response.json();
    return {data};
};

export const updateUser = async (updatedData)=>{
    const response = await fetch("/users/"+updatedData.id,{
      method:"PATCH",
      body:JSON.stringify(updatedData),
      headers:{"Content-type":"application/json"}
    });
    const data = await response.json();
    return {data};
  };