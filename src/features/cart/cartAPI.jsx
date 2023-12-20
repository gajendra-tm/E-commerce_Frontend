export const addToCart = async (cartItems) => {
  const response = await fetch(" http://localhost:8080/cart", {
    method: "POST",
    body: JSON.stringify(cartItems),
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

export const fetchCartItemsByUserId = async (userId) => {
  const response = await fetch(" http://localhost:8080/cart?user=" + userId);
  const data = await response.json();
  return { data };
};

export const updateCartItems = async (updateValue)=>{
  const response = await fetch("http://localhost:8080/cart/"+updateValue.id,{
    method:"PATCH",
    body:JSON.stringify(updateValue),
    headers:{"Content-type":"application/json"}
  });
  const data = await response.json();
  return {data};
};

export const deleteCartItems = async (itemId)=>{
  const response = await fetch("http://localhost:8080/cart/"+itemId.id,{
    method:"DELETE",
    headers:{"Content-type":"application/json"},
  });
  const data = await response.json();
  return {data:itemId}
}