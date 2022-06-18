import { addIcon, closeIcon, editIcon } from "../icons";

export const imageProps = (image, image_preview, removeHandler, tag) => {
  return (
    <div className="create_from_input_file">
      <label htmlFor={`${tag}`}>
        <span>{!image ? addIcon : editIcon}</span>
      </label>
      {image && (
        <>
          <img src={image_preview} alt={`${tag}`} />
          <button className="image_remove_btn" onClick={removeHandler}>
            {closeIcon}
          </button>
        </>
      )}
    </div>
  );
};

export const imagePropsForSpecification = (
  state,
  i,
  index,
  imageRemoveHandler
) => {
  return (
    <div className="create_from_input_file_specification">
      <label
        htmlFor={`specifications_image_file${i}_${index}`}
        className="specification_image"
      >
        <span>{!state[i].category_data[index].image ? addIcon : editIcon}</span>
      </label>
      {state[i].category_data[index].image && (
        <>
          <img
            src={state[i].category_data[index].image}
            alt="specifications logo"
          />
          <button
            className="image_remove_btn"
            onClick={() => imageRemoveHandler(i, index)}
          >
            {closeIcon}
          </button>
        </>
      )}
    </div>
  );
};

export const benefitsTypeImageProps = (image, src, i, imageRemoveHandler) => {
  return (
    image && (
      <>
        <img src={src} alt="benefits logo" />
        <button
          className="image_remove_btn"
          onClick={() => imageRemoveHandler(i)}
        >
          {closeIcon}
        </button>
      </>
    )
  );
};
