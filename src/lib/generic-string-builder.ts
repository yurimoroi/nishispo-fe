type queryStringBuilderProps = {
  queryString: string;
  targetKey: string;
  targetValue: string;
  isDeletePage?: boolean;
  isRemoveTargetKey?: boolean;
};

export const queryStringBuilder = ({
  queryString,
  targetKey,
  targetValue,
  isDeletePage = false,
  isRemoveTargetKey = false,
}: queryStringBuilderProps) => {
  const urlParams = new URLSearchParams(queryString);

  // Remove page from url param e.g., new search term or choosing filters
  if (urlParams.has("page") && isDeletePage) urlParams.delete("page");

  // Remove target key if needed on some scenarios and return immediately
  if (isRemoveTargetKey) {
    urlParams.delete(targetKey);
    return urlParams.toString();
  }

  // If target key already exist, update the value
  if (urlParams.has(targetKey)) {
    urlParams.set(targetKey, targetValue);
  } else {
    urlParams.append(targetKey, targetValue);
  }

  return urlParams.toString();
};
