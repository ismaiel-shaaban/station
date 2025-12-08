/**
 * Gets the full URL for an image from storage
 * @param {string} imagePath - The path to the image
 * @returns {string} The full URL to the image
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // Check if the image path is already a full URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Use environment variable if available, otherwise fallback to a default
  const baseUrl = "https://us-east-1.linodeobjects.com/fantaza"
  
  return `${baseUrl}/${imagePath}`;
};
