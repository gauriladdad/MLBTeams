import React, { useRef, useEffect, useState } from "react";

type InfiniteScrollProps = {
  onBottomHit: () => void;
  isLoading: boolean;
  hasMoreData: boolean;
  loadOnMount: boolean;
};

function isBottom(ref: React.RefObject<HTMLDivElement>) {
  console.log("ref.current", ref.current);
  if (!ref.current) {
    return false;
  }
  console.log("window.innerHeight", window.innerHeight);
  console.log(
    "ref.current.getBoundingClientRect().bottom",
    ref.current.getBoundingClientRect().bottom
  );
  const a = ref.current.getBoundingClientRect().bottom <= window.innerHeight;
  console.log("a: ", a);
  return a;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  onBottomHit,
  isLoading,
  hasMoreData,
  loadOnMount,
  children
}) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadOnMount && initialLoad) {
      onBottomHit();
      setInitialLoad(false);
    }
  }, [onBottomHit, loadOnMount, initialLoad]);

  useEffect(() => {
    const onScroll = () => {
      console.log("isLoading", isLoading);
      console.log("hasMoreData", hasMoreData);
      console.log("isBottom(contentRef)", isBottom(contentRef));

      if (!isLoading && hasMoreData && isBottom(contentRef)) {
        onBottomHit();
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [onBottomHit, isLoading, hasMoreData]);

  return <div ref={contentRef}>{children}</div>;
};

export default InfiniteScroll;
