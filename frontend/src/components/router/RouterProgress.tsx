import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

export function RouterProgress() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, [location]);

  return null;
}
