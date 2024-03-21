import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../context/cart.js";
import { useNavigate } from "react-router-dom";

import banner from "../../assets/Ideas for Every Taste in an Earthy Modern Living Room.jpeg";

const Furnitures = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get related products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
    return (
      <div>
        <div
          className="container px-32 flex
      justify-center items-center
      w-screen h-95 gap-14"
        >
          <div
            className="
        bg-no-repeat  shadow-xl overflow-hidden col-span-4
        sm:col-start-2 sm:row-start-2 md:col-start
        6 lg:col-start-9 xl:col-start-8 w-2/3"
          >
            <img
              className="w-full h-96 bg-slate-400 object-cover"
              src={banner}
              alt="furnitures"
            />
          </div>
          <div
            className="h-96
        shadow-sm col-span-7 row-start-1
        sm:col-start-5 sm:row-start-1 sm:col-span
        7 md:col-start-5 md:row-start-1 md:col-
        span-6 lg:col-start-3 lg:row-start-1"
          >
            <h2
              class="lg:text-sm font-bold text-gray-800 mb-
        5 sm:text-sm flex gap-2 items-center"
            >
              <div
                class="bg-black 
               h-[0.1rem] w-16"
              ></div>
              Furnitures
            </h2>

            <h1
              className="
            lg:text-3xl font-semibold leading-tight tracking-t

          ight  dark:text-black sm:text-xl"
            >
              The Right Furniture can make any space feel like a vacation
            </h1>
            <p
              className="
          text-xs text-gray-700 dark:text-gray-400
          my-5 w-96
          "
            >
              We offer a wide range of furniture for your home, from sofas and
              chairs to dining tables and desks. Our furniture is made with the
              highest quality materials and designed by experienced craftsmen
              who are passionate about creating pieces that will last for years
              to come. Whether you're looking for something classic or trendy
              and modern, we have everything you need to create the perfect
              living room, bedroom, office or outdoor space. Browse our
              collection below to find the perfect piece for your home today!
            </p>
            <button
              className="
          bg-black hover:bg-gray-800 focus:ring
          ring-black rounded-sm shadow-sm 
          p-3 text-white"
            >
              Shop Now
            </button>
          </div>
        </div>
        <div>{/* Product Cards */}</div>
      </div>
    );
  };
};

export default Furnitures;

// <div className="grid grid-cols-12 grid-rows-9 gap-4 h-4/6">
// <div className="col-span-4 row-span-4 col-start-2 row-start-2">3</div>
// <div className="col-span-6 row-span-4 col-start-6 row-start-2">4</div>
// <div className="col-span-2 row-span-3 col-start-2 row-start-6">
//   <div className="flex flex-wrap my-3 ">
//     {products?.map((p) => (
//       <div>
//         <div className="m-2 group p-8  bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#000000] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all max-w-xs h-96 ">
//           <img
//             onClick={() => navigate(`/product/${p.slug}`)}
//             src={`/api/v1/product/product-image/${p._id}`}
//             style={{
//               transform:
//                 "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
//             }}
//             className="w-44 card1img aspect-auto text-[#000000] group-hover:bg-gray-200 text-5xl rounded-s p-2 transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2  mx-auto"
//             alt=""
//           ></img>
//           <p className="cardtxt font-semibold text-black tracking-wider group-hover:text-white text-xl">
//             {p.name.substring(0, 15)}
//           </p>
//           <p className="blueberry font-semibold text-gray-600  group-hover:text-gray-200 text-xs">
//             {p.description.substring(0, 30)}
//           </p>
//           <div className="ordernow flex flex-row justify-between items-center w-full">
//             <p className="ordernow-text text-[#000000] font-semibold group-hover:text-white">
//               SR:{p.price}/-
//             </p>
//             <button
//               onClick={() => {
//                 setCart([...cart, p]);
//                 localStorage.setItem(
//                   "cart",
//                   JSON.stringify([...cart, p])
//                 );
//                 toast.success("Item Added to cart");
//               }}
//               className="btun4 text-white lg:inline-flex items-center gap-3 group-hover:bg-white group-hover:text-black bg-[#000] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer py-2 px-4 text-sm font-semibold rounded-full butn"
//             >
//               ADD TO CART
//             </button>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
// </div>

//new

// {/* <div class="grid grid-cols-1 grid-rows-1 gap-4 h-auto sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-12 lg:grid-rows-9">
//         <div class="col-span-4 row-span-4 col-start-2 row-start-2 sm:col-span-full sm:row-span-full lg:col-span-4 lg:row-span-4 lg:col-start-2 lg:row-start-2">

//         </div>
//         <div class="col-span-6 row-span-4 col-start-6 row-start-2 sm:col-span-full sm:row-span-full lg:col-span-6 lg:row-span-4 lg:col-start-6 lg:row-start-2">
//           4
//         </div>
//         <div class="col-span-2 row-span-3 col-start-2 row-start-6 sm:col-span-full sm:row-span-full lg:col-span-2 lg:row-span-3 lg:col-start-2 lg:row-start-6">
//           <div class="flex flex-wrap my-3 ">
//             {products?.map((p) => (
//               <div>
//                 <div class="m-2 group p-8 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#000000] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all max-w-xs h-96 ">
//                   <img
//                     onClick={() => navigate(`/product/${p.slug}`)}
//                     src={`/api/v1/product/product-image/${p._id}`}
//                     style={{
//                       transform:
//                         "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
//                     }}
//                     class="w-44 card1img aspect-auto text-[#000000] group-hover:bg-gray-200 text-5xl rounded-s p-2 transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2 mx-auto"
//                     alt=""
//                   ></img>
//                   <p class="cardtxt font-semibold text-black tracking-wider group-hover:text-white text-xl">
//                     {p.name.substring(0, 15)}
//                   </p>
//                   <p class="blueberry font-semibold text-gray-600 group-hover:text-gray-200 text-xs">
//                     {p.description.substring(0, 30)}
//                   </p>
//                   <div class="ordernow flex flex-row justify-between items-center w-full">
//                     <p class="ordernow-text text-[#000000] font-semibold group-hover:text-white">
//                       SR:{p.price}/-
//                     </p>
//                     <button
//                       onClick={() => {
//                         setCart([...cart, p]);
//                         localStorage.setItem(
//                           "cart",
//                           JSON.stringify([...cart, p])
//                         );
//                         toast.success("Item Added to cart");
//                       }}
//                       class="btun4 text-white lg:inline-flex items-center gap-3 group-hover:bg-white group-hover:text-black bg-[#000] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer py-2 px-4 text-sm font-semibold rounded-full butn"
//                     >
//                       ADD TO CART
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
