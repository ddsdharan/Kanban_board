import { useMemo } from "react";

function useTruncate(text, maxLength) {
  const truncatedText = useMemo(() => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substring(0, maxLength)}...`;
  }, [text, maxLength]);

  return truncatedText;
}

export default useTruncate;
