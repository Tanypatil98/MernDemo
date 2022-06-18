import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { routes } from "../../constants";
import { useForm } from "../../hooks/useForm";
import Input from "../../component/Common/Input";
import Button from "../../component/Common/Button";
import { addProduct } from "../../store/slice/productSlice";

const ProductCreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialFValues = {};

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true
  );

  const validate = () => {
    let valid = false;
    if (!values.name) {
      setErrors({...errors, name: "Please enter valid name!"});
    } else if (!values.image) {
      setErrors({...errors, image: "Please enter valid Image!"});
    } else if (!values.description) {
      setErrors({...errors, description: "Please enter valid description!"});
    } else if (!values.quantity) {
      setErrors({...errors, quantity: "Please enter valid quantity!"});
    } else if (!values.unit_price) {
      setErrors({...errors, unit_price: "Please enter valid unit_price!"});
    } else {
      valid = true;
    }
    return valid;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    validate();
    if (validate()) {
      let data = new FormData();
        data.append('name', values.name);
        data.append('image', values.image);
        data.append('description', values.description);
        data.append('quantity', values.quantity);
        data.append('unit_price', values.unit_price);
  
      dispatch(addProduct({data:data,cb:(err,res) => {
        if(res){
          navigate(routes.homepage);
        }
      }}))
    }
  };

  return (
    <>
      <div className="comman_btn_container center_back_btn">
        <Link to={routes.homepage} className="comman_btn back_btn">
          Back
        </Link>
      </div>
      <div className="project_edit_main_content">
        <div className="about_page_section">
          <div className="about_detaile_row">
            <div className="about_detaile_text_content">
              <Input
                className="create_from_input_content"
                labelClassName="create_from_label"
                inputClassName="create_from_input"
                errorClassName="err_text"
                placeholder="Enter your Product name"
                label="Name"
                name="name"
                value={values.name}
                onChange={(e) => handleInputChange(e)}
                type="text"
                id="name"
                error={errors.name}
              />
            </div>
            <div className="about_detaile_text_content">
            <Input
                className="create_from_input_content"
                labelClassName="create_from_label"
                inputClassName="create_from_input"
                errorClassName="err_text"
                placeholder="Enter your Product Image"
                label="Product Image"
                name="image"
                onChange={(e) => handleInputChange(e)}
                type="file"
                id="image"
                error={errors.image}
              />
            </div>
            <div className="about_detaile_text_content">
            <Input
                className="create_from_input_content"
                labelClassName="create_from_label"
                inputClassName="create_from_input"
                errorClassName="err_text"
                placeholder="Enter your Product Description"
                label="Product Description"
                name="description"
                value={values.description}
                onChange={(e) => handleInputChange(e)}
                type="text"
                id="description"
                error={errors.description}
              />
            </div>
            <div className="about_detaile_text_content">
            <Input
                className="create_from_input_content"
                labelClassName="create_from_label"
                inputClassName="create_from_input"
                errorClassName="err_text"
                placeholder="Enter your Product Quantity"
                label="Product Quantity"
                name="quantity"
                value={values.quantity}
                onChange={(e) => handleInputChange(e)}
                type="text"
                id="quantity"
                error={errors.quantity}
              />
            </div>
            <div className="about_detaile_text_content">
            <Input
                className="create_from_input_content"
                labelClassName="create_from_label"
                inputClassName="create_from_input"
                errorClassName="err_text"
                placeholder="Enter your Product Unit Price"
                label="Product Unit Price"
                name="unit_price"
                value={values.unit_price}
                onChange={(e) => handleInputChange(e)}
                type="text"
                id="unit_price"
                error={errors.unit_price}
              />
            </div>
          </div>
          <Button
            className={`project_submit_bottom_btn center_back_btn`}
            buttonClassName="comman_btn"
            onClick={submitHandler}
            text={"Create Product"}
          />
        </div>
      </div>
    </>
  );
};

export default ProductCreatePage;
