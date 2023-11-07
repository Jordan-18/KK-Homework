import React,{useContext} from 'react';
import MyContext from './MyContext.js';
function Iframe(props){
    const {frameSrc} = props;
    const { globalData, setglobalData } = useContext(MyContext);

    return (
        <div>
            <iframe
                title="IPython Notebook"
                src={`${globalData.api}/html/${frameSrc}.html`}
                width="100%"
                height="600px"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>       
    )
}

export default Iframe