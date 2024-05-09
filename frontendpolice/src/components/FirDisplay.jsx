import React from 'react'
import { useLocation } from 'react-router-dom'


export default function FirDisplay() {

    const location = useLocation();

    const renderData = JSON.parse(location.state);



    return (
        <div>

            <div style={{ width: '100%', height: '100vh' }}>
                <iframe
                    title="PDF Viewer"
                    src={renderData}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                ></iframe>
            </div>
        </div>
    )
}
