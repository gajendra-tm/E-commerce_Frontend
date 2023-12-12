export const fetchAllProducts = async () => {
  const response = await fetch("http://localhost:8080/products");
  const data = await response.json();
  return { data };
};

export const fetchProductsByFilters = async (filter,sort,pagination)=>{
  let queryString = "";
  // need to add multi levels on server
  for(let key in filter){
    const filterValues = filter[key];
    if(filterValues.length){
      const lastFilterValues = filterValues[filterValues.length-1]
      queryString += `${key}=${lastFilterValues}&`
    }
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }
  const response = await fetch("http://localhost:8080/products?"+queryString);
  const data = await response.json();
  const totalItems = await response.headers.get("X-Total-Count");
  return ({data:{products:data, totalItems:totalItems}});
};
 
