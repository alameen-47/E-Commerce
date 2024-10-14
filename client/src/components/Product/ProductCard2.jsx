import React from "react";
import { Link } from "react-router-dom";
import { ImageCarousel } from "./ImageCarousel";

export const ProductCard2 = ({ product }) => {
  return (
    <div>
      <Link
        // key={product._id}
        to={`/dashboard/admin/product/${product.slug}/${product._id}`}
        className="group shadow-xl hover:shadow-2xl rounded-xl transition duration-300 p-2 pt-5 "
      >
        <div className="aspect-h-1 aspect-w-2  overflow-hidden rounded-lg bg-gray-400 xl:aspect-h-8 xl:aspect-w-7  ">
          <ImageCarousel product={product} />
        </div>
        <h3 className="md:mt-4 sm:mb-1 lg mb-2 text-sm text-gray-900">
          {product.name}
        </h3>
        <p className="md:mt-1 sm:mb-1 lg mb-2 text-xs font-medium text-gray-500">
          {(() => {
            const description = product.description;
            return description.length > 20
              ? description.slice(0, 30) + "..."
              : description;
          })()}
        </p>
        <p className="md:mt-1 sm:mb-1 lg mb-2 text-xs font-medium">
          <p className="md:mt-1 sm:mb-1 lg mb-2 text-xs font-medium text-gray-600">
            <strike className="font-semibold text-gray-400">
              {Math.floor(product.price * (1 + product.offer / 100))}/-
            </strike>
            <span className="text-green-500 font-semibold">
              {product.offer}% off
            </span>
          </p>

          <span className="font-semibold text-lg">
            {Math.floor(
              product.price *
                (1 + product.offer / 100) *
                (1 - product.offer / 100)
            )}
            /-
          </span>
        </p>
      </Link>
    </div>
  );
};
