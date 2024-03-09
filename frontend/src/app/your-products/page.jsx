"use client"
import SingleProduct from "@/components/SingleProduct"
import Header from "@/components/Header";
import useSWR from "swr";
import {fetcher} from "@/utils/fetcher";


export default function YourProducts() {

    const {data, error, isLoading} = useSWR("/user/your-products", fetcher)

    return (
        <>
            <Header/>
            <div>
                <p className="font-bold text-3xl ml-[300px] my-4 ">Your Products</p>
            </div>
            {data && data.length !== 0 &&
                <div className="w-full h-auto min-h-[350px] flex flex-col justify-start items-center ">
                    {data.map((item) => (
                        <SingleProduct key={item.id} id={item.bid?.product.id} name={item.bid?.product.name} description={item.bid?.product.description}
                                       category={item.bid?.product?.category.category} subcategory={item.bid?.product?.category.subCategory}
                                       startingPrice={item.bid?.product.startingPrice}
                                       isBidActive={item.bid?.product.isBidActive}
                                       isSold={item.bid?.product.isSold}
                                       image={item.images[0]?.imageByte}/>
                    ))}

                </div>}
            {!data || data && data.length === 0 && (
                <div className="w-[100%] min-h-[500px] h-auto flex justify-center items-start ">
                    <p className="p-4 px-8 mt-40 text-xl text-gray-500 rounded-lg ">
                        Products which you have posted will be shown here
                    </p>
                </div>
            )}

        </>
    )
}
