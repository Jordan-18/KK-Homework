import React from 'react';

const RouteModule = [
	{ page: 'Dashboard', to: '', component: React.lazy(() => import('../page/Dashboard.js')) },
	{ page: 'Test', to: 'test-model', component: React.lazy(() => import('../page/TestData.js')) },
	{ page: 'DecisionTree', to: 'ai', params:'DecisionTree', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'RandomForest', to: 'ai', params:'RandomForest', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'Fuzzy', to: 'ai', params:'Fuzzy', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'SVM', to: 'ai', params:'SVM', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'SVMr', to: 'ai', params:'SVMr', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'SVR', to: 'ai', params:'SVR', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'LSTM', to: 'ai', params:'LSTM', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'LSTMr', to: 'ai', params:'LSTMr', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'RNN', to: 'ai', params:'RNN', component: React.lazy(() => import('../page/model.ai.js')) },
	{ page: 'RNNr', to: 'ai', params:'RNNr', component: React.lazy(() => import('../page/model.ai.js')) },
];
export default RouteModule;