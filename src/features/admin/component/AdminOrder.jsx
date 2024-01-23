import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrderDetails,
  updateOrdersAsync,
} from "../../orders/orderSlice";

export default function AdminOrder() {
  const [page, setPage] = useState(1);
  const [editOrder, setEditOrder] = useState(-1);
  const [sort, setSort] = useState({_sort:"id", _order:"asc"});
  const dispatch = useDispatch();
  const allOrders = useSelector(selectOrderDetails);

  const handleEdit = (order) => {
    setEditOrder(order.id);
  };

  const handleSort = (sortOption) => {
    const sorting = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sorting);
  };

  const handleUpdate = (e, orders) => {
    const updatedOrder = { ...orders, status: e.target.value };
    dispatch(updateOrdersAsync(updatedOrder));
    setEditOrder(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-300 text-orange-700";
      case "on-transit":
        return "bg-violet-300 text-violet-700";
      case "delivered":
        return "bg-green-300 text-green-700";
      case "cancelled":
        return "bg-red-300 text-red-700";
      default:
        return "bg-orange-300 text-orange-700";
    }
  };

  useEffect(() => {
    // const pagination = { _page: page, _limit: 10 };
    dispatch(fetchAllOrdersAsync({ sort }));
  }, [dispatch, page, sort]);

  return (
    <>
      <div className="flex flex-col justify-center overflow-auto">
        <table className="bg-green-200 rounded-lg overflow-hidden min-h-full">
          <thead className="bg-red-200 text-xs md:text-sm">
            <tr>
              <th
                className="py-3 px-1 lg:px-5 xl:px-10 cursor-pointer"
                onClick={() =>
                  handleSort({
                    sort: "id",
                    order: sort._order === "asc" ? "desc" : "asc",
                  })
                }
              >
                Order Id
                {sort._sort === "id" && sort._order !== "asc" ? (
                   <svg
                    className="inline ml-1"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z"
                        fill="#000000"
                      ></path>{" "}
                    </g>
                  </svg>
                ) : (
                  <svg
                    className="inline ml-1"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"
                        fill="#000000"
                      ></path>{" "}
                    </g>
                  </svg>
                )}
              </th>
              <th className="py-3 px-1 lg:px-5 xl:px-10">Product Details</th>
              <th className="py-3 px-1 lg:px-5 xl:px-10">Shipping Address</th>
              <th className="py-3 px-1 lg:px-5 xl:px-10">Amount</th>
              <th className="py-3 px-1 lg:px-5 xl:px-10">Status</th>
              <th className="py-3 px-1 lg:px-5 xl:px-10">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center text-xs md:text-sm">
            {allOrders.map((orders) => {
              return (
                <tr key={orders.id}>
                  <td className="py-3 px-10">
                    <div>{orders.id}</div>
                  </td>

                  <td className="py-3 px-5">
                    <div className="flex flex-col justify-center items-center">
                      <div className="xl:mr-2">
                        <img
                          src={orders.cartItems[0].thumbnail}
                          alt="image"
                          className=" w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-fill object-center"
                        />
                      </div>
                      <div>
                        <p>{orders.cartItems[0].title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <div>
                      <p>{orders.selectedAddress.fullname}</p>
                      <p>{orders.selectedAddress.address}</p>
                      <p>{orders.selectedAddress.city}</p>
                      <p>{orders.selectedAddress.state}</p>
                      <p>{orders.selectedAddress.pincode}</p>
                      <p>{orders.selectedAddress.phone}</p>
                    </div>
                  </td>
                  <td className="py-3 px-10">${orders.totalPrice}</td>
                  <td className="py-3 px-10">
                    {editOrder === orders.id ? (
                      <div>
                        <select
                          className="rounded-lg bg-gray-200"
                          onChange={(e) => handleUpdate(e, orders)}
                        >
                          <option value="choose">--choose-status--</option>
                          <option value="pending">Pending</option>
                          <option value="on-transit">On-transit</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    ) : (
                      <div
                        className={`${chooseColor(
                          orders.status
                        )} rounded-full p-2`}
                      >
                        <span>{orders.status}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-10">
                    <div className="flex">
                      <span className="mx-1">
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 -4 20 20"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          fill="#000000"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <title>view_simple [#815]</title>{" "}
                            <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                            <g
                              id="Page-1"
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              {" "}
                              <g
                                id="Dribbble-Light-Preview"
                                transform="translate(-260.000000, -4563.000000)"
                                fill="#000000"
                              >
                                {" "}
                                <g
                                  id="icons"
                                  transform="translate(56.000000, 160.000000)"
                                >
                                  {" "}
                                  <path
                                    d="M216,4409.00052 C216,4410.14768 215.105,4411.07682 214,4411.07682 C212.895,4411.07682 212,4410.14768 212,4409.00052 C212,4407.85336 212.895,4406.92421 214,4406.92421 C215.105,4406.92421 216,4407.85336 216,4409.00052 M214,4412.9237 C211.011,4412.9237 208.195,4411.44744 206.399,4409.00052 C208.195,4406.55359 211.011,4405.0763 214,4405.0763 C216.989,4405.0763 219.805,4406.55359 221.601,4409.00052 C219.805,4411.44744 216.989,4412.9237 214,4412.9237 M214,4403 C209.724,4403 205.999,4405.41682 204,4409.00052 C205.999,4412.58422 209.724,4415 214,4415 C218.276,4415 222.001,4412.58422 224,4409.00052 C222.001,4405.41682 218.276,4403 214,4403"
                                    id="view_simple-[#815]"
                                  >
                                    {" "}
                                  </path>{" "}
                                </g>{" "}
                              </g>{" "}
                            </g>{" "}
                          </g>
                        </svg>
                      </span>

                      <span
                        className="mx-1 cursor-pointer"
                        onClick={() => handleEdit(orders)}
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                              fill="#0F0F0F"
                            ></path>{" "}
                          </g>
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={() => setPage()}></button>
      </div>
    </>
  );
}
