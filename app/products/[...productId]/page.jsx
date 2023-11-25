'use client'
import Image from "next/image";
import { Axios } from "@/Helpers/AxiosHelper";
import { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useRouter } from "next/navigation";



const Product = ({ params }) => {
    const router = useRouter()
    const [product, setProduct] = useState({});

    useEffect(() => {
        const getProduct = async (productId) => {
            try {
                const response = await Axios.get(`https://fakestoreapi.com/products/${productId}`)
                setProduct(response.data)
            } catch (error) {
                return []
            }
        }
        getProduct(params.productId)
    }, [params.productId])

    const capitalizeName = (str) => {
        if (!str) {
            return "";
        }
        const stringArray = str.split(" ")
        const modifiedArray = stringArray.map(word => {
            const firstLetter = word.charAt(0).toUpperCase()
            const restWord = word.slice(1).toLowerCase()
            return firstLetter + restWord
        })
        return modifiedArray.join(" ")
    }

    // const handleShow = (product: any) => {
    //     setActiveProduct(product)
    //     setIsModalOpen(true);
    // }
    // const handleClose = () => setIsModalOpen(false)

    // const deleteHandler = async (productId: any) => {
    //     // await ApiHelper.deleteProduct(productId, token?.id)
    //     router.push('/')
    // };

    // const addToCartHandler = async ({ quantity }: any) => {
    //     const data = { userId, productId, quantity: +quantity }
    //     const response = await addProductToCart(data)
    //     toast.success(response.data.message)
    //     reset()
    // };


    return (
        <div className="bg-white flex justify-center mt-5">
            <div className="border-solid border-2 border-gray-200 rounded-md w-3/5">
                <div className="mx-auto max-w-2xl px-5 py-3 lg:max-w-7xl">
                    <h2 className="text-xl font-bold text-center text-gray-800" >{product.title}</h2>
                </div>
                <hr />
                <div className="px-3 py-3 cursor-pointer"><MdOutlineKeyboardBackspace size={28} onClick={() => router.push("/")} /></div>
                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg mt-3">
                    <Image className='h-full w-full object-cover object-center lg:h-full lg:w-full' width={200} height={200} style={{ objectFit: 'scale-down', height: '300px' }} src={product?.image} alt={`Card img cap${product?.image}`} />
                </div>

                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">Product Rating :
                                    {[0, 1, 2, 3, 4].map((icon, index) => (
                                        <CiStar size={25} key={index} />
                                    ))}
                                </div>
                                {/* <p className="sr-only">{reviews.average} out of 5 stars</p>
                                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {reviews.totalCount} reviews
                                </a> */}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Add to bag
                        </button>

                    </div>
                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description and details */}
                        <div className="mb-3">
                            <h3 className="sr-only">Category</h3>
                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{capitalizeName(product?.category)}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default Product