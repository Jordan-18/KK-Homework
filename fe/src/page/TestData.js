import React, { useRef,useState, useEffect,useContext  }  from 'react';
import Webcam from "react-webcam";
import MyContext from '../components/MyContext.js';
import * as faceapi from 'face-api.js';

function TestData(){
    const [rankData, setrankData] = useState([]);
    const [camera, setCamera] = useState(false);
    const [loading, setLoading] = useState(true);
    const { globalData, setglobalData } = useContext(MyContext);
    const [modelSelected, setModelSelected] = useState(false);
    const [buttonImg, setButtonImg] = useState(false);
    const webcamRef = useRef(null)
    
    const handleWebcamToggle = () => {
        if(!modelSelected){
           return alert("Please select a model first");
        }
        setCamera(!camera);
        setButtonImg(!buttonImg);

        setTimeout(async() => {
            await setupFaceDetection()
        }, 2000);
    };

    async function loadModels() {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    }

    async function setupFaceDetection() {
        await loadModels();
        const videoElement = webcamRef.current.video;
        const canvas = faceapi.createCanvasFromMedia(videoElement);
    
        // Mengatur ukuran canvas
        const canvasWidth = videoElement.clientWidth;
        const canvasHeight = videoElement.clientHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    
        canvas.style.position = 'absolute';
        canvas.style.top = '100';
        canvas.style.left = '45';
        canvas.style.zIndex = '1';

        const chartWidget = document.getElementById('maincamera');
        if (chartWidget) {
            chartWidget.appendChild(canvas);
        }
    
        const displaySize = { width: canvasWidth, height: canvasHeight };
        faceapi.matchDimensions(canvas, displaySize);
    
        // Melakukan deteksi wajah secara berkala
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }, 100);
    }

    useEffect(() => {
        async function fetchData(){
			try {
				const data = await globalData.data
                if(data){
                    const filteredRouteModule = data.filter((pageData) => pageData?.accuracy !== undefined);
                    const sortedRouteModule = filteredRouteModule.slice().sort((a, b) => b?.accuracy - a?.accuracy);
                    setrankData(sortedRouteModule);
                }

                setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		fetchData()
    }, [globalData]);

    return(
        <div>
            <div className="row g-5 g-xl-10">
                <div className="col-xl-12 mb-5 mb-xl-10">
                    <div className="card card-flush h-xl-100">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center p-0" style={{marginTop: '20px'}}>
                            <div id="kt_charts_widget_29" className="ps-7 pe-0 mb-5 d-flex align-items-center">
                            <div className="row">
                                {rankData.map((data, index) => (
                                    <div className="col mb-4 m-2" key={index}>
                                        <input 
                                            type="radio" 
                                            className="btn-check" 
                                            name="optionsModel" 
                                            id={`option${index}`}
                                            onChange={() => setModelSelected(true)}
                                        />
                                        <label className="btn btn-outline-primary" htmlFor={`option${index}`} 
                                            style={{height:'80px', width:'150px', border:'1px solid #c0c0c1', color:'#727172'}}>
                                            {data.model.length > 10 ? `${(data.model.slice(0, 7)).toUpperCase()}...` : data.model.toUpperCase()}
                                            <br/>
                                            {(parseFloat(data.accuracy)).toFixed(2)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-5 g-xl-10">
                <div className="col-xl-5 mb-5 mb-xl-10">
                    <div className="card card-flush h-xl-100">
                        <div className="card-header py-7">
                            <div className="m-0">
                                <div className="d-flex align-items-center mb-2">
                                    <button className="btn" onClick={handleWebcamToggle} disabled={buttonImg}>
                                        <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2">
                                            <i className="fa-solid fa-camera fs-2" style={{color: camera ? '#75cc74' : '#f1416c'}}></i>
                                        </span>
                                        <span className={`badge badge-${camera ? 'light-success' : 'light-danger' } fs-base`}>Camera</span>
                                    </button>
                                </div>
                                <span className="fs-6 fw-semibold text-gray-400"></span>
                            </div>
                            <div className="card-toolbar">
                                <button className="btn" onClick={handleWebcamToggle}  disabled={buttonImg}>  
                                    {camera ? (  
                                        <i className="fa-solid fa-eye"></i>
                                    ) :
                                        <i className="fa-solid fa-eye-slash"></i>
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-center align-items-center p-0" style={{overflow: 'auto'}}>
                            <div id="kt_charts_widget_29" className="ps-7 pe-0 mb-5 d-flex align-items-center" >
                            {modelSelected && camera && (
                                <div id="maincamera">
                                    <Webcam
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        audio={false}
                                        style={{ width: '350px', height: '270px', padding: '10px', borderRadius: '5px', background: 'black'}}
                                        
                                    />
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-7 mb-5 mb-xl-10">
                    <div className="card card-flush h-xl-100">
                        <div className="card-header py-7">
                            <div className="m-0">
                                <span className="fs-6 fw-semibold text-gray-400">Result</span>
                            </div>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-center align-items-center p-0">
                            <div id="kt_charts_widget_29" className="h-300px w-100 min-h-auto ps-7 pe-0 mb-5 d-flex align-items-center">
                                {/* Form & result */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestData