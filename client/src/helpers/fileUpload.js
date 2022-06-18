import Axios, { authHeaders } from "./axios";

export const fileUpload = async (formData) => {
  try {
    const uploadConfig = await Axios.post(
      `/file/upload`,
      formData,
      authHeaders()
    );
    console.log("uploadconfig", uploadConfig);
    return uploadConfig.data.key;
  } catch (error) {
    console.log("error", error);
  }
};
