import { useNavigate } from "react-router-dom";

const Filter = ({ sp, filters }) => {
  const navigate = useNavigate();

  const addFilter = (filter, state) => {
    let search = "";

    Object.entries(sp).forEach(([key, value], i) => {
      if (i > 0) search += "&";
      search += `${key}=${value}`;
    });

    if (search.length > 0) search += `&${filter}=${state}`;
    else search += `${filter}=${state}`;

    navigate(`/search?${search}`);
  };

  const removeFilter = (filter) => {
    let search = "";

    Object.entries(sp).forEach(([key, value], i) => {
      if (key != filter) {
        if (i > 0) search += "&";
        search += `${key}=${value}`;
      }
    });

    navigate(`/search?${search}`);
  };

  return (
    <div className="flex flex-col gap-5 w-3/12 p-1 m-1 rounded bg-gray-100">
      <div className="flex gap-1">
        {Object.entries(sp).map(([key, value], i) => {
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
                  removeFilter(key);
                }}
                key={i}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
      {sp.d == undefined && filters.d != null ? (
        <div className="p-1">
          <p className="font-semibold">Departamento:</p>
          <div className="flex flex-col items-start gap-1 p-1">
            {filters.d.map((d, i) => {
              return (
                <button
                  className="text-sm hover:underline hover:cursor-pointer"
                  onClick={() => {
                    addFilter("d", d);
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
      {sp.c == undefined && filters.c != null ? (
        <div className="p-1">
          <p className="font-semibold">Condicion:</p>
          <div className="flex flex-col items-start gap-1 p-1">
            {filters.c.map((c, i) => {
              return (
                <button
                  className="text-sm hover:underline hover:cursor-pointer"
                  onClick={() => {
                    addFilter("c", c);
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
        <p className="text-xs">Bajo mantenimiento</p>
        <p className="font-semibold">Precio:</p>
        <div className="flex gap-2 p-1">
          <div className="flex flex-col items-center">
            <p className="text-sm">Minimo</p>
            <input
              type="text"
              className="w-full bg-white"
              placeholder={`$${filters.ph}`}
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">Maximo</p>
            <input
              type="text"
              className="w-full bg-white"
              placeholder={`$${filters.pl}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
