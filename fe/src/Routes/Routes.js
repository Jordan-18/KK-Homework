import React from 'react';

const RouteModule = [
	{ page: 'Dashboard', to: '', component: React.lazy(() => import('../page/Dashboard.js')) },
	{ page: 'Test', to: 'test-model', component: React.lazy(() => import('../page/TestData.js')) },

	{ page: 'DecisionTree', to: 'kk', params:'DecisionTree', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'RandomForest', to: 'kk', params:'RandomForest', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'Fuzzy', to: 'kk', params:'Fuzzy', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'SVM', to: 'kk', params:'SVM', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'SVMr', to: 'kk', params:'SVMr', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'SVR', to: 'kk', params:'SVR', component: React.lazy(() => import('../page/model.ai.js')) },

	// { page: 'DecisionTree', to: 'DecisionTree', component: React.lazy(() => import('../page/DecisionTree.js')) },
	// { page: 'RandomForest', to: 'RandomForest', component: React.lazy(() => import('../page/RandomForest.js')) },
	// { page: 'Fuzzy', to: 'Fuzzy', component: React.lazy(() => import('../page/Fuzzy.js')) },
	// { page: 'SVM', to: 'SVM', component: React.lazy(() => import('../page/SVM.js')) },
	// { page: 'SVMr', to: 'SVMR', component: React.lazy(() => import('../page/SVMr.js')) },
	// { page: 'SVR', to: 'SVR', component: React.lazy(() => import('../page/SVR.js')) },
];
export default RouteModule;