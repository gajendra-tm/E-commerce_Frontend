export const fetchLoggedInUserOrders = async(userId)=>{
    const response = await fetch("http://localhost:8080/orders?loggedInUser.id="+userId);
    const data = await response.json();
    return {data};
};
