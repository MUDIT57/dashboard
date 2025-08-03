import { useEffect, useState } from "react";

export default function useDebounce(term, delay) {
  const [debounceValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(term);
    }, delay);
    return () => clearTimeout(handler);
  }, [term, delay]);
  return debounceValue;
}
