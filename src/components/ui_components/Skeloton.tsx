
const Skeloton = () => {

  return (
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pb-10 pt-25">
      {Array.from({ length: 10 }).map((_, index: number) => (
        <div key={index} className="flex w-100 sm:w-60 flex-col gap-4 m-auto">
          <div className="skeleton h-50 md:h-40 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </div>
  );
}

export default Skeloton;