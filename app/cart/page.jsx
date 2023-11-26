'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '@/ReduxStore/Slices/productSlice'
import { getProducts, getUserCart } from '@/Helpers/ApiHelper'
import { addProduct, reduceProduct, selectCart } from '@/ReduxStore/Slices/cartSlice'
import { FaPlus, FaMinus } from "react-icons/fa6";


const Cart = () => {
    const { data, status } = useSession()
    const userId = data?.user?.id;
    const dispatch = useDispatch()

    const [productsWithDetails, setProductsWithDetails] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    //Fetch product and cart data from redux store
    const products = useSelector(selectProducts)
    const cartData = useSelector(selectCart)

    useEffect(() => {
        dispatch(getProducts())
        if (userId) {
            dispatch(getUserCart(userId))
        }
    }, [userId])

    useEffect(() => {
        // Update productsWithDetails and totalAmount
        const updatedProducts = cartData?.products?.map(cartProduct => {
            const productDetails = products?.find(product => product?.id === cartProduct?.productId);

            if (productDetails) {
                return {
                    ...productDetails,
                    quantity: cartProduct.quantity,
                };
            }
            return null;
        });

        setProductsWithDetails(updatedProducts);

        const updatedTotalAmount = updatedProducts?.reduce((accumulator, product) => {
            const productAmount = product?.price * product?.quantity;
            return accumulator + productAmount;
        }, 0);

        setTotalAmount(updatedTotalAmount);
    }, [cartData, products,]);

    const handleAddProduct = (productId, quantity) => {
        dispatch(addProduct({ productId, quantity }));
    };

    const handleReduceProduct = (productId, quantity) => {
        dispatch(reduceProduct({ productId, quantity }));
    };

    const removeHandler = (productId) => {
        const updatedCart = productsWithDetails?.filter(prod => prod?.id !== productId);
        setProductsWithDetails(updatedCart);

        // Recalculate totalAmount based on updated productsWithDetails
        const updatedTotalAmount = updatedCart?.reduce((accumulator, product) => {
            const productAmount = product?.price * product?.quantity;
            return accumulator + productAmount;
        }, 0);

        setTotalAmount(updatedTotalAmount);
    };
    console.log("productsWithDetails", productsWithDetails);
    return (
        <div className="bg-white flex justify-center mt-5">
            <div className="border-solid border-2 border-gray-200 rounded-md w-2/5">
                <div className="mx-auto max-w-2xl px-5 py-3 lg:max-w-7xl">
                    <h2 className="text-xl font-bold text-center text-gray-800" >Cart</h2>
                </div>
                <hr />
                <div className="p-5">
                    {productsWithDetails && <div className="mt-8 mb-6">
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {productsWithDetails.map((product, index) => {
                                    return (<li className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <Image className='h-full w-full object-cover object-center lg:h-full lg:w-full py-3' width={90} height={90} style={{ objectFit: 'scale-down' }} src={product?.image} alt={`Card img cap${index}`} />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href="#">{product?.title}</a>
                                                    </h3>
                                                    <p className="ml-4">${product?.price}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{product?.category}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">Qty {product?.quantity}
                                                </p>
                                                <div className='flex cursor-pointer'>
                                                    <div class="inline-flex">
                                                        <button class="bg-white-300 border border-gray-400 hover:bg-indigo-400 text-gray-800 font-bold py-1 px-2 rounded-l" onClick={() => { handleAddProduct(product?.id, 1) }}>
                                                            <FaPlus size={17} />
                                                        </button>
                                                        <button class="bg-white-300 border border-gray-400 hover:bg-indigo-400 text-gray-800 font-bold py-1 px-2 rounded-r" onClick={() => {
                                                            if (product?.quantity === 1) {
                                                                removeHandler(product.id)
                                                            } else {
                                                                handleReduceProduct(product?.id, 1)
                                                            }
                                                        }}>
                                                            <FaMinus size={17} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex">
                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => removeHandler(product.id)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>)
                                })}
                            </ul>
                        </div>
                    </div>}

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6 pb-0">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${totalAmount}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or {"  "}
                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </p>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default Cart