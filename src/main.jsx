import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/assets/styles/global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './Components/Router'
import { Provider } from 'react-redux'
import { store } from './store/store'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
        <Router />
        </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
