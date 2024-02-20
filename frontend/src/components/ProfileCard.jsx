"use client"
import React,{useRef,useState,useEffect} from "react";
import Button from "@/components/Button";
import Image from "next/image";

const ProfileCard =()=>{
    const inputRef = useRef(null);
    const [img,setimg] = useState("");
    const imageClick = ()=>{
        inputRef.current.click();
    }
    const formData = new FormData();
    useEffect(()=>{
        formData.append("Image",img);
        formData.append("name","img");
        for (const [key, value] of formData.entries()) {
            console.log(key + ": " + value);
        }


    },[img])
    const imagebase64 = async (file)=>{
        const reader= new FileReader()
        await reader.readAsDataURL(file)
        const data = new Promise((resolve,reject)=>{
            reader.onload = ()=> resolve(reader.result)
            reader.onerror = (err)=> reject(err)
        })
        return data
    }
    const handleChange = async (e)=>{
        const files = e.target.files[0];
        const base = imagebase64(files);
        console.log(base);
        setimg(files);

    }
    return (
        <>
            <div className="w-2/5 flex justify-center">
                <div className="w-2/3  py-2 mt-2 border-black   rounded-2xl">
                    <div className="w-full flex justify-center items-center my-2">
                        <div className="w-1/2 h-[200px]  relative">
                            {img ? <img src={URL.createObjectURL(img)} alt='Image'
                                        className={"w-full h-full rounded-full"}/> :
                                <Image src={"/bike.jpg"} alt={"Profile"} objectFit={"cover"} fill
                                       className="rounded-full"/>}
                        </div>
                    </div>
                    <div className="w-full text-center py-2 ">
                        <h1 className="text-2xl font-semibold tracking-wider">Shahabuddin akhon</h1>
                        <div onClick={imageClick}>
                            <input name="img" className={"hidden"} type={"file"} ref={inputRef}
                                   onChange={handleChange}/>
                            <Button value={"+ Change Picture"} type={"submit"} option={true}/>
                        </div>
                    </div>
                    <div className="w-4/5 p-3 border-2 mx-auto my-2 rounded-xl bg-gray-100">
                        <p className={"tracking-wide"}>Upload a new avatar.Image can be uploaded in any dimension but
                            recommend to upload <span className={"font-semibold"}>512x512</span> & size must be less
                            than <span className="font-semibold">250MB</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfileCard;