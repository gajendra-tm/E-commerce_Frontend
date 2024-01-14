export const createOrder = async (orders) => {
  const response = await fetch(" http://localhost:8080/orders", {
    method: "POST",
    body: JSON.stringify(orders),
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

export const fetchAllOrders = async (sort) => {
  let queryString = "";
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  const response = await fetch("http://localhost:8080/orders?"+queryString);
  const totalOrders = response.headers.get("X-Total-Count")
  const data = await response.json();
  return { data:{data:data,totalOrders:totalOrders} };
};

export const updateOrders = async (order)=>{
  const response = await fetch("http://localhost:8080/orders/"+order.id,{
    method:"PATCH",
    body:JSON.stringify(order),
    headers:{"Content-type":"application/json"},
  })
  const data = await response.json();
  return {data};
}