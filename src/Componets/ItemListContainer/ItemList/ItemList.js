import React from "react";
import { Link } from "react-router-dom";
import "./ItemList.css";

const ItemList = ({ database }) => {
  console.log(database);

  return (
    <div className="itemList-Container">
      {database.map((element, index) => {
        return (
          <Link to={"/product/" + element.id} key={index}>
            <div className="card">
              <div className="card-img">
                <img src={element.thumbnail} alt="..." />
              </div>
              <div className="card-body">
                <h5 className="card-title">{element.title}</h5>
                <div className="card-price">
                  <p>{element.discount ? "$" + element.discount : ""}</p>
                  <p>${element.price}</p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

{
  /* <div className="card-buttons">
<button type="button" className="btn btn-outline-secondary">
  <i className="bi bi-dash"></i>
</button>
<input type="text" className="form-control" value={1} />
<button type="button" className="btn btn-outline-primary">
  <i className="bi bi-plus"></i>
</button>
<button type="button" className="btn btn-outline-primary">
  <i className="bi bi-bag-plus"></i>
</button>
</div> */
}

export default ItemList;
