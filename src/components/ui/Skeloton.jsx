const Skeleton = ({ skelotonFor }) => {
  return (
    skelotonFor === "Home" ? Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="flex w-[98%] md:w-5/6 gap-4 m-auto mt-5">
        <div className="custom-skeleton h-50 w-1/3 rounded"></div>
        <div className="flex flex-col flex-1 gap-4 justify-center">
          <div className="custom-skeleton h-4 w-1/2 rounded"></div>
          <div className="custom-skeleton h-4 w-2/3 rounded"></div>
          <div className="custom-skeleton h-4 w-1/6 rounded"></div>
          <div className="custom-skeleton h-4 w-full rounded"></div>
          <div className="custom-skeleton h-4 w-1/2 rounded"></div>
        </div>
      </div>
    )) : Array.from({ length: 2 }).map((_, index) => (
      <div key={index} className="flex w-[98%] md:w-5/6 flex-col gap-4 m-auto mt-5">
        <div className="custom-skeleton h-50 w-5/6 rounded m-auto"></div>
        <div className="custom-skeleton h-4 w-48 m-auto rounded"></div>
        <div className="custom-skeleton h-4 w-26 m-auto rounded"></div>
        <div className="custom-skeleton h-4 w-[65%] m-auto rounded"></div>
        <div className="custom-skeleton h-4 w-[65%] m-auto rounded"></div>
      </div>
    ))
  );
}

export default Skeleton;