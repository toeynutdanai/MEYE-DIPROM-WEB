import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const beforeUpload = (file) => {
  return false;
};

export const uploadButton = (loading = false) => (
  <button
    style={{
      border: 0,
      background: "none",
    }}
    type="button"
  >
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </button>
);
