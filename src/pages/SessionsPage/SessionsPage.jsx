import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"
import axios from 'axios';
import styled from "styled-components"

export default function SessionsPage( { setDiaInfo, setHoraInfo } ) {
    const [filme, setFilme] = useState([]);
    const [dias, setDias] = useState([]);

    const parametros = useParams();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${parametros.idFilme}/showtimes`;
        const requisicao = axios.get(url);

        requisicao.then(resposta => {
            setFilme(resposta.data);
            setDias(resposta.data.days);
        });
    }, []);

    function selecionarHorario(dia, hora) {
        setDiaInfo(dia);
        setHoraInfo(hora);
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
            {dias.map (dia =>
                <SessionContainer key={dia.date}>
                    {dia.weekday} - {dia.date}
                    <ButtonsContainer>
                        <Link to={`/assentos/${dia.showtimes[0].id}`} key={dia.showtimes[0].id} >
                            <button onClick={() => selecionarHorario(dia.date, dia.showtimes[0].name)}>{dia.showtimes[0].name}</button>
                        </Link>
                        <Link to={`/assentos/${dia.showtimes[1].id}`} key={dia.showtimes[1].id} >
                            <button onClick={() => selecionarHorario(dia.date, dia.showtimes[1].name)}>{dia.showtimes[1].name}</button>
                        </Link>
                    </ButtonsContainer>
                </SessionContainer>)}
            </div>

            <FooterContainer>
                <div>
                    <img src={filme.posterURL} alt="poster" />
                </div>
                <div>
                    <a>{filme.title}</a>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        cursor: pointer;
        margin-right: 20px;
        width: 83px;
        height: 43px;
        background: #E8833A;
        color: #FFFFFF;
        border-radius: 3px;
        border: none;
    }
    button:hover {
        opacity: 50%;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    left: 0;
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        a {
            text-align: left;
            margin-top: -20px;
        }
    }
`