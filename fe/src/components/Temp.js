import React, { useEffect, useState  } from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';

import Header from './Header.js'
import Sidebar from './Sidebar.js'
import Footer from './Footer.js'

import RouteModule from '../Routes/Routes.js';

import MyContext from './MyContext';

function Temp(){
	const [globalAPI, setGlobalAPI] = useState('http://192.168.0.9:5234');
	const [globalData, setglobalData] = useState([])

	async function getData(){
		await fetch(`${globalAPI}/data`)
		.then((response) => response.json())
		.then((data) => {
			const filteredRouteModule = data.filter((pageData) => pageData.accuracy !== undefined);
			const sortedRouteModule = filteredRouteModule.slice().sort((a, b) => b.accuracy - a.accuracy);
			setglobalData({
				data: sortedRouteModule,
				api : globalAPI
			});

		})
		.catch((error) => {
			setglobalData([]);
			console.error('Error fetching data:', error);
		});
	}

	useEffect(() => {
		async function fetchData(){
			try {
				await getData()
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		fetchData()
    }, [globalData]);

    return(
		<MyContext.Provider value={{ globalData, setglobalData }}>
		<div className="d-flex flex-column flex-root app-root" id="kt_app_root">
			<div className="app-page flex-column flex-column-fluid" id="kt_app_page">
			<BrowserRouter>
				<Header/>
					<div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
						<Sidebar/>
						<div className="app-main flex-column flex-row-fluid" id="kt_app_main">
							<div className="d-flex flex-column flex-column-fluid">
							<div id="kt_app_content" className="app-content flex-column-fluid">
            					<div id="kt_app_content_container" className="app-container container-xxl">
								<Routes>
									{RouteModule.map((pageData, index) =>(
										<Route 
											key={index}
											path={`/${pageData.to.toLowerCase()}`} 
											element={
												<Suspense fallback={<BigSpinner/>}>
													<pageData.component/>
												</Suspense>
											}
										/>
									))}
								</Routes>
								</div>
							</div>
							</div>
							<Footer/>
						</div>
					</div>
				</BrowserRouter>
			</div>
		</div>
		</MyContext.Provider>
    )
}

function BigSpinner() {
	return <h2>🌀 Loading...</h2>;
}

export default Temp;