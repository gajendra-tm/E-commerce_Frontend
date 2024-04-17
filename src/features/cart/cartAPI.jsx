export const addToCart = async (cartItems) => {
  const response = await fetch("/cart", {
    method: "POST",
    body: JSON.stringify(cartItems),
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

export const fetchCartItemsByUserId = async () => {
  const response = await fetch("/cart");
  const data = await response.json();
  return { data };
};

export const updateCartItems = async (updateValue)=>{
  const response = await fetch("/cart/"+updateValue.id,{
    method:"PATCH",
    body:JSON.stringify(updateValue),
    headers:{"Content-type":"application/json"}
  });
  const data = await response.json();
  return {data};
};

export const deleteCartItems = async (itemId)=>{
  const response = await fetch("/cart/"+itemId.id,{
    method:"DELETE",
    headers:{"Content-type":"application/json"},
  });
  const data = await response.json();
  return {data:itemId}
}

export const resetCart = async ()=>{
  const response = await fetchCartItemsByUserId();
  const items = response.data;
  for (let item of items){
await deleteCartItems(item)
  }
  return {data:"success"}
}