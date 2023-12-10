export const fetchAllProducts = async () => {
  const response = await fetch("http://localhost:8080/products");
  const data = await response.json();
  return { data };
};

export const fetchProductsByFilters = async (filter)=>{
  let queryString = "";
  // need to add multi levels on server
  for(let key in filter){
    queryString += `${key}=${filter[key]}&`
  }
  const response = await fetch("http://localhost:8080/products?"+queryString);
  const data = await response.json();
  return {data};
};

