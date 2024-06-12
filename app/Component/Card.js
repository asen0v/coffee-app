import Image from "next/image";
import Link from "next/link";
import ProductDelete from "./productDelete";
import RoastStars from "./RoastStars";

export function ImgCard({ values }) {
  return (
    <div className="card-deck mx-auto pt-4">
      <div className="card mx-auto">
        <Image
          className="card-img-top pt-1"
          src={`/images/products/${values.logo}`}
          width={281}
          height={180}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">
            {values.brand} <br />
            {values.name}
          </h5>
          <hr />
          <p className="card-text">
            {values.ptype}
            <br />
            Weight: {values.weight}kg.
            <br />
            Type: {values.type}
            <br />
          </p>
          Roast:
          <div className="progress">
            <div
              className="progress-bar bg-warning text-center"
              role="progressbar"
              style={{ width: `${values.roast}0%` }}
              aria-valuenow={values.roast}
              aria-valuemin="0"
              aria-valuemax="10"
            >
              {values.roast}
            </div>
          </div>
          <RoastStars roast={values.roast} />
        </div>
        <div className="card-footer bg-success fs-5">
          <small className="text-white ">£{values.price}</small>
        </div>
      </div>
    </div>
  );
}

export function ImgCard2({ values, session }) {
  function deleteAction(id) {
    const delStatus = ProductDelete(id);
    if (delStatus) {
      document.getElementById(id).remove();
    }
  }

  return (
    <div className="col mb-3">
      <div className="product-item bg-light">
        <div className="card">
          <div className="thumb-content">
            <div className="price">£{values.price}</div>
            <Link href={`/products/${values.id}/details`}>
              <Image
                className="card-img-top img-fluid"
                src={`/images/products/${values.logo}`}
                width={120}
                height={120}
                alt={values.brand}
              />
            </Link>
          </div>
          <h4 className="card-title text-center">{values.brand}</h4>
          <h6 className="card-title text-center">{values.name}</h6>
          <ul className="list-inline product-meta text-center">
            <li className="list-inline-item">
              <Image
                src="/icons/beans.png"
                width={16}
                height={16}
                alt="coffee beans icon"
              />{" "}
              {values.weight}kg.
            </li>
            <li className="list-inline-item">
              <Image
                src="/icons/coffee-beans.png"
                width={16}
                height={16}
                alt="coffee beans icon"
              />{" "}
              {values.pType}
            </li>
          </ul>
          <p className="card-text text-center">{values.type}</p>
          <div className="product-ratings text-center">
            Roast
            <RoastStars roast={values.roast} />
            <hr />
            <Link href={`/products/${values.id}/details`} className="text-white btn btn-info fa fa-plus-circle mb-3">
              View Product
            </Link><br />
            {session && session.admin && (
              <>
                <Link href={`/products/${values.id}/edit`} className="text-white badge badge-pill badge-primary me-2">
                  Edit
                </Link>
                <button className="badge badge-pill badge-danger" onClick={() => deleteAction(values.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
