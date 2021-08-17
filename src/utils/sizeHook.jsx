import { useState, useEffect } from "react";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
};

export { useWindowDimensions };
