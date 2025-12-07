import heic2any from "heic2any";

export const convertHeicToJpeg = async (file: File) => {
  try {
    const isHeic =
      file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic");

    if (isHeic) {
      const convertedFile = await heic2any({
        blob: file,
        toType: "image/jpeg",
      });

      // Handle both Blob and Blob[] return types
      const blob = Array.isArray(convertedFile)
        ? convertedFile[0]
        : convertedFile;
      return blob;
    } else {
      return file;
    }
  } catch (error) {
    console.error("Error converting HEIC to JPEG:", error);
    throw error;
  }
};

/**
 * Fetches an image from a given URL and converts it to JPEG if it's in HEIC format.
 *
 * @param {string} url - The URL of the image to fetch and potentially convert.
 * @returns {Promise<string>} A Promise that resolves to either:
 *   - A blob URL of the converted JPEG image if the original was HEIC.
 *   - The original URL if the image was not HEIC or if an error occurred.
 *
 * @throws {Error} Logs the error to console but doesn't throw it, returns original URL instead.
 */
export const getHEICPreviewURL = async (url: string): Promise<string> => {
  try {
    // Check if the URL is a blob URL
    if (url.startsWith("blob:")) {
      // For blob URLs, we need to fetch the blob directly in the browser
      const response = await fetch(url);
      const blob = await response.blob();

      // Check if it's a HEIC file by checking the file extension
      // Upon checking on Chrome, it returns text/plain for HEIC files
      const isHeic =
        url.toLowerCase().endsWith(".heic") || blob.type === "text/plain";
      if (!isHeic) {
        return url;
      }

      const file = new File([blob], "image.heic", { type: "image/heic" });
      const convertedBlob = await convertHeicToJpeg(file);
      return URL.createObjectURL(convertedBlob);
    }

    // For regular URLs, use our route to bypass CORS
    const response = await fetch(
      `/download/image?url=${encodeURIComponent(url)}`,
    );
    const blob = await response.blob();

    // Check if it's a HEIC file by checking the file extension
    const isHeic = url.toLowerCase().endsWith(".heic");
    if (!isHeic) {
      return url;
    }

    const file = new File([blob], "image.heic", { type: "image/heic" });
    const convertedBlob = await convertHeicToJpeg(file);
    return URL.createObjectURL(convertedBlob);
  } catch (error) {
    console.error("Error converting HEIC to JPEG URL:", error);
    return url;
  }
};

/**
 * Converts a HEIC image URL to a JPEG Blob using the CORS bypass API route
 *
 * @param url - The URL of the image to convert
 * @returns Promise<Blob | null> - Returns converted JPEG Blob if HEIC, original Blob if not HEIC, or null if error
 */
export const convertHeicToJPEGByURL = async (url: string) => {
  try {
    // Use the CORS bypass API route
    const response = await fetch(
      `/download/image?url=${encodeURIComponent(url)}`,
    );
    const blob = await response.blob();

    const isHeic =
      blob.type === "image/heic" || blob.type.toLowerCase().includes("heic");
    if (isHeic) {
      const file = new File([blob], "image.heic", { type: blob.type });
      return await convertHeicToJpeg(file);
    }
    return blob;
  } catch (error) {
    console.error("Error converting HEIC to JPEG URL:", error);
    return null;
  }
};
