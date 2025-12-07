export const replaceMaxAttribute = (message: string, maxLength: number) => {
  return message.replace(":attribute", String(maxLength));
};
