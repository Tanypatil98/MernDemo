import React, { useEffect } from "react";
import "../../css/ProjectForm.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../store/slice/productSlice";
import Loader from "../../component/Common/Loader";
import { Link } from "react-router-dom";
import { routes } from "../../constants";
import ListItem from "../../component/List/ListItem";
import { addToCart } from "../../store/slice/cartSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();
const ProductListPage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product.products);
  const loader = useSelector((state) => state.product.loader);

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  const onClickHandle = (item) => {
    let data = {
      productId: item._id,
      quantity: item.quantity
    }
    console.log(data);
    dispatch(addToCart({data:data,cb:(err,res) => {
      if(res){
          toast.success(res)
      }
    }}));
  };

  return (
    <>
      {loader && <Loader />}
      <div className="comman_btn_container center_back_btn">
          <Link
            className="comman_btn back_btn"
            to={routes.productAdd}
          >
            Create Product
          </Link>
          <Link
            className="comman_btn back_btn"
            to={routes.cart}
            style={{marginLeft: 'calc(100% - 33%)'}}
          >
            Cart
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
                <th className="custom_data_table_heading">Action</th>
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
                      onClickHandle={onClickHandle}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductListPage;
