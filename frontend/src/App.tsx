import {HomePage} from './components/home/HomePage.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PlanPage} from "./components/plan/PlanPage.tsx";

const queryClient = new QueryClient()

function App() {


  return (
    <>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/workplan/:id" element={<PlanPage/>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </>
  )
}

export default App
