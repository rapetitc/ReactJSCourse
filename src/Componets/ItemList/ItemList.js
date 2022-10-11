import React from "react";

const style = {
  cardTitle: {
    height: "75px",
    textOverflow: "...",
    overflow: "hidden",
  },
  input: {
    width: "50px",
  },
};

const ItemList = ({ database }) => {
  console.log(database);

  return (
    <>
      <div className="row">
        {database.map((element) => {
          return (
            <div className="col-sm-4 col-md-3 col-lg-2 my-3">
              <div className="card">
                <img src={element.image_link} className="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 className="card-title" style={style.cardTitle}>
                    {element.name}
                  </h5>
                  <p className="card-text h3">${element.price}</p>
                  <div className="input-group mb-3">
                    <button type="button" className="btn btn-outline-secondary">
                      <i className="bi bi-dash"></i>
                    </button>
                    <input type="text" className="form-control" value={5} />
                    <button type="button" className="btn btn-outline-primary">
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ItemList;
