import React, { useState } from "react";
import Button from "../Common/Button";
import Input from "../Common/Input";

const ListItem = ({ item, i, onClickHandle, onChangeHandle }) => {
  const [data,setData] = useState(item);
  return (
    <tr className="custom_data_table_row" key={i}>
      <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        {onChangeHandle ? data.productId.name : data.name}
      </td>
      <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        <img src={`${process.env.REACT_APP_IMAGE}/${onChangeHandle ? data.productId.image : data.image}`} width={100} height={100} alt="Product" />
      </td>
      <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        {onChangeHandle ? data.productId.description : data.description}
      </td>
      <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        <Input
                className="create_from_input_content"
                inputClassName="create_from_input"
                name="quantity"
                value={data.quantity}
                onChange={(e) => {
                  if(onChangeHandle) {
                    onChangeHandle({...data, quantity : parseInt(e.target.value)});
                    setData({...data, quantity : parseInt(e.target.value)})
                  }else{ 
                    setData({...data, quantity : parseInt(e.target.value)})
                  }}}
                type="number"
                id="quantity"
                min={0}
                max={data.quantity}
              />
      </td>
      <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        {onChangeHandle ? data.productId.unit_price : data.unit_price}
      </td>
      {!onChangeHandle && <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        <Button
          buttonClassName="custom_data_table_button"
          onClick={(e) => onClickHandle(data)}
          text="Add to Cart"
        />
      </td>}
    </tr>
  );
};

export default ListItem;
