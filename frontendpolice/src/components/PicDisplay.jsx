import React from 'react'
import { useLocation } from 'react-router-dom'


export default function PicAndFirDisplay() {

    const location = useLocation();

    const renderData = JSON.parse(location.state);


    return (
        <div>
            <div className="p-4 sm:ml-64"  >
                <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700   `}>

                    <div class="flex justify-center mt-5 mb-10">
                        <img className='rounded w-100 h-100' src={renderData} alt="Image" />
                    </div>
                </div>
            </div>

        </div>
    )
}
