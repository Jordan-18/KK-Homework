import React from 'react';
import { useLocation } from 'react-router-dom';
import Iframe from '../components/ai.frame.js'

function ModelComponent(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const model = searchParams.get('model');

    return (
        <div>
            <Iframe
                frameSrc={`${model}`}
            />
        </div>       
    )
}

export default ModelComponent