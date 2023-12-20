export const createOrder = async(orders)=>{
    const response = await fetch(" http://localhost:8080/orders",{
        method:"POST",
        body:JSON.stringify(orders),
        headers:{"Content-type":"application/json"}
    });
    const data = await response.json();
    return {data};
}