import { useNavigate } from "react-router-dom";

const Filter = ({ searchParams, filters }) => {
  const navigate = useNavigate();

  const addSearchParam = (searchParamToAdd) => {
    searchParamToAdd.forEach(([key, value]) => {
      searchParams.set(key, value);
    });
    navigate(`/search?${searchParams.toString()}`);
  };

  const removeSearchParam = (searchParamToRemove) => {
    searchParams.delete(searchParamToRemove);
    navigate(`/search?${searchParams.toString()}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const minPrice = e.target[0].value;
    const maxPrice = e.target[1].value;

    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      alert("El precio mínimo debe ser menor o igual al precio máximo.");
      return;
    }

    const prices = [];
    if (minPrice) prices.push(["pl", minPrice]);
    if (maxPrice) prices.push(["ph", maxPrice]);

    addSearchParam(prices);
  };

  return (
    <div className="flex flex-col gap-5 w-3/12 p-1 m-1 rounded bg-gray-100">
      <div className="flex gap-1">
        {Array.from(searchParams).map(([key, value], i) => {
          if (key == "p") return;
          return (
            <div
              className="flex gap-1 py-1 px-2 text-xs text-gray-700 bg-white rounded"
              key={i}
            >
              <p>{value}</p>
              <button
                className="size-3 cursor-pointer"
                onClick={() => {
                  removeSearchParam(key);
                }}
                key={i}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
      {searchParams.get("d") == undefined && filters.d != null ? (
        <div className="p-1">
          <p className="font-semibold">Departamento:</p>
          <div className="flex flex-col items-start gap-1 p-1">
            {filters.d.map((d, i) => {
              return (
                <button
                  className="text-sm hover:underline hover:cursor-pointer"
                  onClick={() => {
                    addSearchParam([["d", d]]);
                  }}
                  key={i}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      {searchParams.get("c") == undefined && filters.c != null ? (
        <div className="p-1">
          <p className="font-semibold">Condicion:</p>
          <div className="flex flex-col items-start gap-1 p-1">
            {filters.c.map((c, i) => {
              return (
                <button
                  className="text-sm hover:underline hover:cursor-pointer"
                  onClick={() => {
                    addSearchParam([["c", c]]);
                  }}
                  key={i}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      <div className="p-1">
        <p className="font-semibold">Precio:</p>
        <form className="flex items-end gap-2 p-1" onSubmit={submitHandler}>
          <div className="flex flex-col items-center">
            <p className="text-sm">Minimo</p>
            <input
              type="text"
              className="w-full bg-white"
              defaultValue={searchParams.get("pl") && ""}
              placeholder={`$${filters.pl}`}
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">Maximo</p>
            <input
              type="text"
              className="w-full bg-white"
              defaultValue={searchParams.get("ph") && ""}
              placeholder={`$${filters.ph}`}
            />
          </div>
          <button className="size-max p-1 rounded-full bg-white hover:cursor-pointer">
            <svg fill="currentColor" className="size-4" viewBox="0 0 16 16">
              <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Filter;
