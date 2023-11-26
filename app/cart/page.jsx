'use client'
import { Axios } from '@/Helpers/AxiosHelper'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const Cart = () => {
    const { data, status } = useSession()
    const userId = data?.user?.id;

    const [cartData, setCartData] = useState([])
    const [allProducts, setAllProducts] = useState([])


    const productsWithDetails = cartData?.products?.map(cartProduct => {
        const productDetails = allProducts?.find(product => product?.id === cartProduct?.productId);
        const totalAmount = productDetails?.price * cartProduct?.quantity;

        if (productDetails) {
            return {
                ...productDetails,
                quantity: cartProduct.quantity,
                totalAmount
            };
        }
        return null;
    });

    const totalAmount = productsWithDetails?.reduce((accumulator, product) => {
        const productAmount = product?.price * product?.quantity;
        return accumulator + productAmount;
    }, 0);

    console.log(totalAmount);


    useEffect(() => {
        const getCartData = async (id) => {
            try {
                const response = await Axios.get(`https://fakestoreapi.com/carts/${id}`)
                setCartData(response.data)
                const productResponse = await Axios.get(`https://fakestoreapi.com/products`)
                setAllProducts(productResponse.data)
            } catch (error) {
                setCartData([])
            }
        }
        if (userId) {
            getCartData(userId)
        }
    }, [userId])

    console.log('cartData', cartData)
    return (
        <div className="bg-white flex justify-center mt-5">
            <div className="border-solid border-2 border-gray-200 rounded-md w-3/5">
                <div className="mx-auto max-w-2xl px-5 py-3 lg:max-w-7xl">
                    <h2 className="text-xl font-bold text-center text-gray-800" >Cart</h2>
                </div>
                <hr />
                <div className="p-3 flex justify-center">
                    <div className="flex h-full flex-col bg-white shadow-xl w-3/5">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            {/* <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                <div className="ml-3 flex h-7 items-center">
                                    <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span className="absolute -inset-0.5"></span>
                                        <span className="sr-only">Close panel</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div> */}

                            {productsWithDetails && <div className="mt-8">
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
                                                        <p className="text-gray-500">Qty {product?.quantity}</p>

                                                        <div className="flex">
                                                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>)
                                        })}
                                    </ul>
                                </div>
                            </div>}
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart