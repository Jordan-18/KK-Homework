import React, { useState,useEffect,useContext}  from 'react';
import Icon from '../components/Icon/Random.js';
import MyContext from '../components/MyContext.js';

function Dashboard(){
    const [rankData, setrankData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const { globalAPI, setglobalAPI } = useContext(MyContext);
    const { globalData, setglobalData } = useContext(MyContext);
    

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
        // fetch(`${globalAPI}/data`)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     const filteredRouteModule = data.filter((pageData) => pageData.accuracy !== undefined);
        //     const sortedRouteModule = filteredRouteModule.slice().sort((a, b) => b.accuracy - a.accuracy);
        //     setrankData(sortedRouteModule);

        //     setLoading(false);
        //   })
        //   .catch((error) => {
        //     console.error('Error fetching data:', error);
        //     setLoading(false);
        //   });
        fetchData()
    }, [globalData]);

    return(
        <div>
            <div className="row g-5 g-xl-10">
            {loading ? (
                <div className="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-4 me-6">
                </div>
            ) : 
                rankData.map((pageData, index) => (
                    <div key={index} className="col-xl-4 mb-5 mb-xl-10">
                        <div className="card card-flush h-xl-100">
                            <div className="card-header py-7">
                                <div className="m-0">
                                    <div className="d-flex align-items-center mb-2">
                                        <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2">
                                            {index == 0 ? <i className="fa-solid fa-crown fs-2" style={{color: '#e64a19'}}></i> : Icon[index]}
                                        </span>
                                        <span className="badge badge-light-success fs-base"></span>
                                    </div>
                                    <span className="fs-6 fw-semibold text-gray-400">{(pageData.model).toUpperCase()}</span>
                                </div>
                                <div className="card-toolbar">
                                </div>
                            </div>
                            <div className="card-body d-flex flex-column justify-content-center align-items-center p-0">
                                <div id="kt_charts_widget_29" className="h-300px w-100 min-h-auto ps-7 pe-0 mb-5 d-flex align-items-center">
                                    <h1 className="text-center" 
                                        style={{
                                            paddingLeft:'23%',
                                            fontSize: '6rem',
                                            fontWeight: 'bold',
                                            color: '#8c8b8c'
                                        }}>
                                        {(parseFloat(pageData.accuracy)).toFixed(2)}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Dashboard