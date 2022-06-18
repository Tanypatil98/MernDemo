import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Common/Loader";
import ListItem from "../../component/List/ListItem";
import "../../css/LoginPage.css";
import { addToCart, getCartList } from "../../store/slice/cartSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { routes } from "../../constants";

toast.configure();
const CartPage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const productList = useSelector((state) => state.cart.carts);
  const total = useSelector((state) => state.cart.total);
  const loader = useSelector((state) => state.cart.loader);

  const [mes, setMes] = useState("");

  useEffect(() => {
    dispatch(getCartList());
  }, [dispatch, mes]);

  const onChangeHandle = (item) => {
    let data = {
      productId: item.productId._id,
      quantity: item.quantity
    }
    console.log(data);
    dispatch(addToCart({data:data,cb:(err,res)=>{
      console.log(res);
      if(res){
        setMes(res);
        toast.success(res)
      }
    }}));
  }

  return (
    <>
    {loader && <Loader />}
    <div className="comman_btn_container center_back_btn">
        <Link to={routes.homepage} className="comman_btn back_btn">
          Back
        </Link>
      </div>
    <div className="project_edit_main_content">
        <div className="custom_data_table_content">
          <table className="custom_data_table">
            <thead className="custom_data_table_head">
              <tr>
                <th className="custom_data_table_heading">Product Name</th>
                <th className="custom_data_table_heading">Product Image</th>
                <th className="custom_data_table_heading">Product Description</th>
                <th className="custom_data_table_heading">Quantity</th>
                <th className="custom_data_table_heading">Unit Price</th>
              </tr>
            </thead>
            <tbody className="custom_data_table_body">
              {productList &&
                productList?.map((item, i) => {
                  return (
                    <ListItem
                      key={i}
                      item={item}
                      i={i}
                      onChangeHandle={onChangeHandle}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
        <div className="project_edit_main_content">
          <h2>Total: <b>{total}</b></h2>
        </div>
      </>
  );
};

export default CartPage;
