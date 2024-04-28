export const fetchProductsById = async (id) => {
  const response = await fetch("/products/" + id);
  const data = await response.json();
  return { data };
};

export const createProduct = async (product) => {
  const response = await fetch("/products/", {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

export const updateProduct = async (product) => {
  const response = await fetch("/products/" + product.id, {
    method: "PATCH",
    body: JSON.stringify(product),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

export const fetchProductsByFilters = async (
  filter,
  sort,
  pagination,
  admin,
) => {
  let queryString = "";
  // need to add multi levels on server
  for (let key in filter) {
    const filterValues = filter[key];
    if (filterValues.length) {
      queryString += `${key}=${filterValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  if(admin){
    queryString += "admin=true"
  }
  const response = await fetch("/products?" + queryString);
  const data = await response.json();
  const totalItems = response.headers.get("X-Total-Count");
  return { data: { products: data, totalItems: totalItems } };
};

export const fetchBrands = async () => {
  const response = await fetch("/brands");
  const data = await response.json();
  return { data };
};

export const fetchCategories = async () => {
  const response = await fetch("/categories");
  const data = await response.json();
  return { data };
};
