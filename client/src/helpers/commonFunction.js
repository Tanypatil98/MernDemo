import { fileUpload } from "./fileUpload";

export const specificationTypeDataHandler = (
  e,
  i,
  index,
  state,
  previewState,
  values,
  setValues,
  innerFieldName,
  fieldName,
  previewFieldName,
  errorProp
) => {
  const { name, value, files } = e.target;
  const list = [...state];

  if (files) {
    if (previewState) {
      var listPreview = [...previewState];
    }
    if (files.length > 0) {
      if (!files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
        listPreview[i][`${innerFieldName}`][index][`${errorProp}`] =
          "Please add valid image (png/gif/jpeg/jpg)";
        setValues({
          ...values,
          [`${previewFieldName}`]: listPreview,
        });
        return;
      }
      if (files[0].size > 5000000) {
        listPreview[i][`${innerFieldName}`][index][`${errorProp}`] =
          "Image size should not be greater than 5MB";
        setValues({
          ...values,
          [`${previewFieldName}`]: listPreview,
        });
        return;
      }
      list[i][`${innerFieldName}`][index][name] = files[0];
      const url = URL.createObjectURL(files[0]);

      listPreview[i][`${innerFieldName}`][index][name] = url;
      listPreview[i][`${innerFieldName}`][index][`${errorProp}`] = "";
      setValues({
        ...values,
        [`${fieldName}`]: list,
        [`${previewFieldName}`]: listPreview,
      });
    }
  } else {
    list[i][`${innerFieldName}`][index][name] = value;
    setValues({
      ...values,
      [`${fieldName}`]: list,
    });
  }
};

export const benefitsTypeHandler = async (data) => {
  if (data?.type === "benefitsTypeHandler") {
    const { name, value, files } = data?.e?.target;
    const list = [...data?.state];
    const listPreview = [...data?.previewState];
    const benefitError = [...data?.error];

    if (files) {
      if (files.length > 0) {
        let condition;
        if (data?.allowPdf) {
          condition = !files[0].name.match(/.(jpg|jpeg|png|gif|pdf)$/i);
        } else {
          condition = !files[0].name.match(/.(jpg|jpeg|png|gif)$/i);
        }
        if (condition) {
          if (data?.allowPdf) {
            benefitError[data?.index] =
              "Please add valid image or pdf (png/gif/jpeg/jpg/pdf)";
          } else {
            benefitError[data?.index] =
              "Please add valid image (png/gif/jpeg/jpg)";
          }
          data?.setValues({
            ...data?.values,
            [data?.errorProp]: benefitError,
          });
          return;
        }
        if (files[0].size > 5000000) {
          benefitError[data?.index] =
            "Image size should not be greater than 5MB";
          data?.setValues({
            ...data?.values,
            [data?.errorProp]: benefitError,
          });
          return;
        }
        list[data?.index][name] = files[0];
        const url = URL.createObjectURL(files[0]);

        listPreview[data?.index] = url;
      }
    } else {
      list[data?.index][name] = value;
    }
    data?.setValues({
      ...data?.values,
      [data?.prop]: list,
      [data?.previewProp]: listPreview,
      [data?.errorProp]: [],
    });
  }
  if (data?.type === "benefitsTypeHandleRemoveClick") {
    const list = [...data?.state];
    const benefitsPreviewList = [...data?.previewState];
    benefitsPreviewList.splice(data?.index, 1);
    list.splice(data?.index, 1);
    data?.setValues({
      ...data?.values,
      [data?.prop]: list,
      [data?.previewProp]: benefitsPreviewList,
    });
  }

  if (data?.type.split(" ")[0] === "benefitsTypeImageRemoveHandler") {
    const tempBenefits = [...data?.state];
    const tempBenefitsImagePreview = [...data?.previewState];
    tempBenefits[data?.index][`${data?.type.split(" ")[1]}`] = "";
    tempBenefitsImagePreview[data?.index] = "";
    data?.setValues({
      ...data?.values,
      [data?.prop]: tempBenefits,
      [data?.previewProp]: tempBenefitsImagePreview,
    });
  }

  if (data?.type.split(" ")[0] === "fileUpload") {
    const formData = new FormData();
    let tempBenefits = [...data?.state];
    for (let i = 0; i < tempBenefits.length; i++) {
      if (typeof data?.state[i][`${data?.type.split(" ")[1]}`] !== "string") {
        formData.append("file", tempBenefits[i][`${data?.type.split(" ")[1]}`]);
        let temp = await fileUpload(formData);
        tempBenefits[i][`${data?.type.split(" ")[1]}`] = temp;
        formData.delete("file");
      }
    }
    return tempBenefits;
  }
  if (data?.type === "benefitsHandleClick") {
    data?.setValues({
      ...data?.values,
      [data?.prop]: [...data?.state, data?.addObj],
    });
  }
};
