import axios from 'axios';
import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

axios.defaults.headers.common['Authorization'] = '97eVqU1AsszfPTccPmhDFe5m';

export default function App() {

    const [objFinal, setObjFinal] = useState({
        filme: '',
        dia: '',
        hora: '',
        nome: '',
        cpf: '',
        assentos: []
    });

    return (
        <>
        <BrowserRouter>

           <NavContainer>CINEFLEX</NavContainer>

            <Routes>

                <Route path='/' element={<HomePage
                                            filmeInfo={objFinal}
                                            setFilmeInfo={setObjFinal} />} />
                <Route path='/sessoes/:idFilme' element={<SessionsPage 
                                             />} />
                <Route path='/assentos/:idSessao' element={<SeatsPage
                                             />} />
                <Route path='/sucesso' element={<SuccessPage 
                                             />} />
            </Routes>

        </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    left: 0;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
