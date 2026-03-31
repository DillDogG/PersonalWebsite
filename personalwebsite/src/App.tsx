import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home.tsx'
import Portfolio from './Portfolio.tsx'
import Contact from './Contact.tsx'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Portfolio" element={<Portfolio />} />
                <Route path="/Contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
