export const getImage = (imageName: string) =>
  `${import.meta.env.VITE_IMAGES_PATH?.toString()}/${imageName}`;
