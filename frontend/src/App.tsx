import {HomePage} from './components/home/HomePage.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const queryClient = new QueryClient()

function App() {


  return (
    <>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </>
  )
}

export default App
