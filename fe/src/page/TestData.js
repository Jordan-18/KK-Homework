import React, { useRef,useState, useEffect,useContext  }  from 'react';
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
import MyContext from '../components/MyContext.js';
import Select from 'react-select';
import Swal from 'sweetalert2';

function TestData(){
    const [regressionData, setregressionData] = useState([]);
    const [classificationData, setclassificationData] = useState([]);
    const [camera, setCamera] = useState(false);
    const [loading, setLoading] = useState(true);
    const { globalData, setglobalData } = useContext(MyContext);
    const [modelSelected, setModelSelected] = useState(null);
    const [buttonImg, setButtonImg] = useState(false);
    const webcamRef = useRef(null)
    const [modelSelection, setmodelSelection] = useState(null);

    const CustomerName = ['Harish', 'Sudha', 'Hussain', 'Jackson', 'Ridhesh', 'Adavan', 'Jonas', 'Hafiz', 'Krithika', 'Ganesh', 'Yadav', 'Sharon', 'Peer', 'Sundar', 'Ramesh', 'Alan', 'Arutra', 'Haseena', 'Verma', 'Muneer', 'Veronica', 'Shah', 'Mathew', 'Akash', 'Anu', 'Sabeela', 'James', 'Willams', 'Malik', 'Amrish', 'Vince', 'Suresh', 'Esther', 'Yusuf', 'Komal', 'Veena', 'Shree', 'Roshan', 'Sudeep', 'Vinne', 'Vidya', 'Arvind', 'Kumar', 'Amy', 'Ravi', 'Sheeba', 'Ram', 'Rumaiza', 'Aditi', 'Surya']
    const Category = ['Oil & Masala', 'Beverages', 'Food Grains', 'Fruits & Veggies', 'Bakery', 'Snacks', 'Eggs, Meat & Fish']
    const City = ['Vellore', 'Krishnagiri', 'Perambalur', 'Dharmapuri', 'Ooty', 'Trichy', 'Ramanadhapuram', 'Tirunelveli', 'Chennai', 'Karur', 'Namakkal', 'Dindigul', 'Kanyakumari', 'Bodi', 'Tenkasi', 'Viluppuram', 'Madurai', 'Salem', 'Cumbum', 'Nagercoil', 'Pudukottai', 'Theni', 'Coimbatore', 'Virudhunagar']
    const Region = ['North', 'South', 'West', 'Central', 'East']
    const Discount = [0.12, 0.18, 0.21, 0.25, 0.26, 0.33, 0.32, 0.23, 0.27, 0.13, 0.1 , 0.19, 0.22, 0.11, 0.28, 0.35, 0.29, 0.34, 0.17, 0.24, 0.16, 0.2 , 0.31, 0.3 , 0.15, 0.14]
    const Month = Array.from({ length: 12 }, (_, index) => index + 1)
    
    const handleWebcamToggle = () => {
        if(!modelSelected){
           return alert("Please select a model first");
        }
        setCamera(!camera);
        setButtonImg(!buttonImg);

        setTimeout(async() => {
            await setupFaceDetection()
        }, 1000);
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

            const name = document.getElementById('customer-name').value

            // && detections[0].detection._score >= 0.95 
            if (detections.length > 0  && name == '') {
                const randomCustomerName = CustomerName[Math.floor(Math.random() * CustomerName.length)];
                const randomCategory = Category[Math.floor(Math.random() * Category.length)];
                const randomCity = City[Math.floor(Math.random() * City.length)];
                const randomRegion = Region[Math.floor(Math.random() * Region.length)];
                const randomDiscount = Discount[Math.floor(Math.random() * Discount.length)];
                const randomMonth = Month[Math.floor(Math.random() * Month.length)];
    
                document.getElementById('customer-name').value = randomCustomerName;
                document.getElementById('category').value = randomCategory;
                document.getElementById('city').value = randomCity;
                document.getElementById('region').value = randomRegion;
                document.getElementById('sales').value = Math.floor(Math.random() * 1000) + 1;
                document.getElementById('discount').value = randomDiscount;
                document.getElementById('month').value = randomMonth;

                PredictReggression()
            }
        }, 100);
    }

    async function PredictReggression(){
        let formData = new FormData(document.getElementById('form-prediction'));
        let jsonData = {};
        for (let [key, value] of formData.entries()) {
            jsonData[key] = value;
        }

        Swal.fire({
            title: 'Loading...',
            timerProgressBar: true,
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
            showConfirmButton: false,
        });

        await fetch('http://localhost:5234/predict/'+modelSelected, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json()) 
        .then(data => {
            document.getElementById('profit').value = data.predict
            Swal.close();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    async function PredictClassification(event){
        event.preventDefault();

        if(!modelSelection){
            return alert("Please select a model first");
        }
        let formData = new FormData(document.getElementById('form-prediction'));
        let jsonData = {};
        for (let [key, value] of formData.entries()) {
            jsonData[key] = value;
        }

        Swal.fire({
            title: 'Loading...',
            timerProgressBar: true,
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
            showConfirmButton: false,
        });

        await fetch('http://localhost:5234/predict/'+modelSelection.value, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json()) 
        .then(data => {
            document.getElementById('label').value = data.predict
            Swal.close();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    useEffect(() => {
        async function fetchData(){
			try {
				const data = await globalData.data
                if(data){
                    const RegressionData = data.filter((pageData) => pageData?.accuracy !== undefined && pageData?.type == 'regression' && pageData?.model != 'svr');
                    const Regression = RegressionData.slice().sort((a, b) => b?.accuracy - a?.accuracy);
                    setregressionData(Regression);

                    const ClassificationData = data.filter((pageData) => pageData?.accuracy !== undefined && pageData?.type == 'classification');
                    const ClassificationRaw = ClassificationData.slice().sort((a, b) => b?.accuracy - a?.accuracy);
                    const Classification = ClassificationRaw.map(item => ({
                        'value' : item.model,
                        'label' : (item.model).toUpperCase()
                    }))
                    setclassificationData(Classification);
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
                                {regressionData.map((data, index) => (
                                    <div className="col mb-4 m-2" key={index}>
                                        <input 
                                            type="radio" 
                                            className="btn-check" 
                                            name="optionsModel" 
                                            id={`option${index}`}
                                            onChange={() => setModelSelected(data.model)}
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
                <div className="col-xl-5 mb-5 mb-xl-10" style={{ maxHeight: '384px' }}>
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
                        <div className="card-body d-flex flex-column justify-content-center align-items-center p-0">
                            <div id="kt_charts_widget_29" className="m-5">
                                <form id='form-prediction' onSubmit={PredictClassification}>
                                    <div className='row'>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="customer-name" className="form-label">Customer Name</label>
                                            <input type="text" className="form-control" id="customer-name" name="customer-name"/>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="category" className="form-label">Category</label>
                                            <input type="text" className="form-control" id="category" name="category"/>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input type="text" className="form-control" id="city" name="city"/>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="month" className="form-label">Month</label>
                                            <input type="text" className="form-control" id="month" name="month"/>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="region" className="form-label">Region</label>
                                            <input type="text" className="form-control" id="region" name="region"/>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="sales" className="form-label">Sales</label>
                                            <input type="number" className="form-control" id="sales" name="sales"/>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="discount" className="form-label">Discount</label>
                                            <input type="number" step="0.01" className="form-control" id="discount" name="discount"/>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="profit" className="form-label">Profit</label>
                                            <input type="number" step="0.01" readOnly className="form-control" id="profit" name="profit"/>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="model" className="form-label">Model</label>
                                            <Select
                                                defaultValue={modelSelection}
                                                onChange={setmodelSelection}
                                                options={classificationData}
                                            />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="label" className="form-label">Label</label>
                                            <input type="text" readOnly className="form-control" id="label" name="label"/>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{float: 'right'}}>Predict</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestData