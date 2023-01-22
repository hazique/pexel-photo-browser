import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = window.localStorage.getItem(key);
    return saved !== null ? saved : defaultValue;
  }
}

export default function useLocalStorage(key, defaultValue){
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};