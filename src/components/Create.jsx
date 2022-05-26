import React, { useState, useRef } from 'react';
import axios from "axios";
import { useWeb3React } from "@web3-react/core"
import { useNavigate, Link } from "react-router-dom";
import ReactLoading from 'react-loading';

const Create = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [flFlag, setFlFlag] = useState(false);
    // const [textContent, setTextContent] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const urlRef = useRef();
    const { active, account } = useWeb3React();
    const navigate = useNavigate()

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const fileType = ["png", "jpeg", "gif"];
    const handleCheck = (fltype) => {
        return fileType.some(item => fltype === item);
    }

    const onFileChange = (e) => {
        setUploadedFile(urlRef.current.files[0]);
        const currentFile = urlRef.current.files[0];
        const flType = currentFile.type.split("/")[1];
        setFlFlag(true);
        if ((currentFile.size > 10000000 && handleCheck(flType)) || (currentFile.size > 1024 && flType === "plain")) {
            setFlFlag(false);
            alert("Please check the file size!");
        }

        if (!handleCheck(flType) && flType !== "plain") {
            setFlFlag(false);
            alert("Please check your file type!")
        }

        // if (currentFile.size <= 1024 && flType === "plain") {
        //     const reader = new FileReader();
        //     reader.onload = (e) => {
        //         const text = e.target.result;
        //         setTextContent(text);
        //     };
        //     reader.readAsText(currentFile);
        // }
    }

    const handleCreate = async (e) => {

        e.preventDefault();

        if (active) {
            if (flFlag) {   
                setIsLoading(true);
                const bodyFormData = new FormData();
                bodyFormData.append('nftfile', urlRef.current.files[0]);
                bodyFormData.append('name', name);
                bodyFormData.append('description', description);
                bodyFormData.append('mintTo', account);
                // bodyFormData.append("attachedText", textContent);

                const config = {     
                    headers: { 'content-type': 'multipart/form-data' }
                }

                // no need for extra headers
                await axios.post('http://localhost:3001/nftmint', bodyFormData, config); 
                setIsLoading(false);
                navigate("/nft")
            } else {
                alert("Please upload your file again");
            }              
        } else {
            alert("Please connect your wallet!")
        }        
    }

    return (
        <div>
            <div className='w-full'>
                <div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 lg:py-24'>
                    {
                        isLoading ? <div className=' absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                            <ReactLoading type={"spinningBubbles"} color={"#737373"} />
                        </div> : null
                    }
                    <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleCreate}>
                        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                            <div>
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">NFT Create</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    This information will be displayed the data to create the NFT. (* Required fields)
                                    </p>
                                </div>

                                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            NFT name<span className=' text-red-600'>*</span>
                                        </label>
                                        <div className=" h-10 my-4 mt-1 sm:mt-0 sm:col-span-2">
                                            <div className="max-w-lg flex h-full rounded-md shadow-sm">                                           
                                                <input
                                                    type="text"
                                                    name="nftname"
                                                    id="nftname"
                                                    autoComplete="nftname"
                                                    className="flex-1 block w-full px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                                                    defaultValue={name}
                                                    onChange={handleChangeName}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            Description
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="max-w-lg shadow-sm block w-full px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                                                defaultValue={description}
                                                onChange={handleChangeDescription}
                                            />
                                            <p className="mt-2 text-sm text-gray-500">Write a few sentences ...</p>
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            Image or Text File<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            {flFlag ?
                                                <div>
                                                    <p>{uploadedFile.name}</p>
                                                </div> : null
                                            }
                                            <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                <div className="space-y-1 text-center">
                                                    <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600 justify-center">
                                                        <label
                                                            htmlFor="nftfile"
                                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                        >
                                                            <span className='text-center'>Upload a file</span>
                                                            <input id="nftfile" name="nftfile" type="file" className="sr-only" ref={urlRef} onChange={onFileChange} />
                                                        </label>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB; TXT up to 1kB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                    
                        </div>

                        <div className="pt-5">
                            <div className="flex justify-end">
                                <Link to={"/nft"}>
                                    <button
                                        type="button"
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>  
                                </Link>  
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create