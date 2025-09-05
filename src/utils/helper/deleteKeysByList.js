function deleteKeysByList(obj, keysToDelete) {
  if (typeof obj !== "object" || !Array.isArray(keysToDelete)) {
    throw new Error(
      "Invalid input. Please provide an object and an array of keys to delete."
    );
  }

  const bufferObj = Object.assign({}, obj);
  keysToDelete.forEach((key) => delete bufferObj[key]);

  return bufferObj;
}

export default deleteKeysByList;
