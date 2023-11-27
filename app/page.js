import { Axios } from "@/Helpers/AxiosHelper";
import Image from "next/image";
import Link from "next/link";

async function getProducts() {
  try {
    const response = await Axios.get('https://fakestoreapi.com/products')
    return response.data
  } catch (error) {
    return []
  }
}
export const metadata = {
  title: 'Products',
  description: 'E-Commerce - Products',
}

const Home = async () => {
  const products = await getProducts()

  return (
    <div className="bg-white flex justify-center mt-5">
      <div className="w-4/5">
        <div className="px-7 py-0 ">
          <h2 className="text-2xl font-bold text-gray-800" >Products</h2>
        </div>
        {/* <hr /> */}
        <div className="p-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 xl:gap-y-8">
          {products.map((product, index) => (
            <div key={product.id} className=" p-3 group relative border-solid border-2 border-gray-200 rounded-md shadow-md">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image className='h-full w-full object-cover object-center lg:h-full lg:w-full' width={200} height={200} style={{ objectFit: 'scale-down', height: '300px' }} src={product.image} alt={`Card img cap${index}`} />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">{product.rating?.rate}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Home
