import { Link } from "react-router-dom";

const ItemList = ({ product }) => {
  return (
    <div className="w-50 bg-white">
      <Link to={"/product/" + product.id}>
        <div className="flex justify-center items-center size-50">
          <img src={product.images[0]} className="max-h-full max-w-full" alt={product.title} />
        </div>
        <div className="w-full py-1 px-3">
          <h5 className="my-1 text-sm line-clamp-2">{product.title}</h5>
          <p className="h-[28px] text-lg text-green-500 font-semibold">
            ${product.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ItemList;
