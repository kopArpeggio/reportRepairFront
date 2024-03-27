export const getImageUrl = (filename) => {
  return `${import.meta.env.VITE_REACT_APP_API_HOST}/${
    import.meta.env.VITE_REACT_APP_IMAGE_PATH
  }/${filename}`;
};
