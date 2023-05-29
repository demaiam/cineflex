import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components"

export default function SeatsPage() {
    const [filme, setFilme] = useState([]);
    const [assentos, setAssentos] = useState([]);

    const [selecionados, setSelecionados] = useState([]);
    const [nome, setNome] = useState('');
    const [cpf, setCPF] = useState('');

    const parametros = useParams();
    const navegar = useNavigate();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`
        const requisicao = axios.get(url);

        requisicao.then(resposta => {
            setFilme(resposta.data);
            setAssentos(resposta.data.seats);
        });
    }, []);


    function enviarServidor(event) {
        event.preventDefault();
        const obj = {ids: selecionados, name: nome, cpf: cpf};
        const requisicao = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', obj);
        const nomeFilme = filme.movie.title;
        const diaFilme = filme.day.date;
        const horaFilme = filme.name;
        requisicao.then(resposta =>
            navegar('/sucesso', {state: { cpf, nome, selecionados, nomeFilme, horaFilme, diaFilme }}));
    }

    function selecionarAssento(assento) {
        if (!assento.isAvaiable) {
            alert('Esse assento não está disponível');
        } else if (selecionados.includes(assento.name)) {
            const novoArr = [...selecionados];
            const posicao = novoArr.indexOf(assento.name);
            novoArr.splice(posicao, 1);
            setSelecionados(novoArr);
        } else {
            const novoArr = [...selecionados, assento.name];
            setSelecionados(novoArr);
        }
    }

    if (filme.length === 0) {
        return (
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="loading"/>
        );
    } else if (filme.length != 0) {
        return (
            <PageContainer>
                Selecione o(s) assento(s)

                <SeatsContainer>
                    {assentos.map(assento =>
                        <SeatItem key={assento.id}
                                  indice={assento.name}
                                  status={assento.isAvaiable}
                                  selecionado={selecionados}>
                            <button onClick={() => selecionarAssento(assento)}
                                    data-test="seat">
                                {assento.name}
                            </button>
                        </SeatItem>
                    )}
                </SeatsContainer>

                <CaptionContainer>
                    <CaptionItem>
                        <CaptionCircle fundo={'#1AAE9E'} borda={'#0E7D71'} />
                        Selecionado
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle fundo={'#C3CFD9'} borda={'#808F9D'} />
                        Disponível
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle fundo={'#FBE192'} borda={'#F7C52B'} />
                        Indisponível
                    </CaptionItem>
                </CaptionContainer>

                <FormContainer>
                    <form onSubmit={enviarServidor}>
                        Nome do Comprador:
                        <input type="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder="Digite seu nome..."
                            data-test="client-name" />

                        <br></br>

                        CPF do Comprador:
                        <input type="cpf"
                            value={cpf}
                            onChange={e => setCPF(e.target.value)}
                            placeholder="Digite seu CPF..."
                            data-test="client-cpf" />

                        <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
                    </form>

                </FormContainer>

                <FooterContainer>
                    <div data-test="footer">
                        <div>
                            <img src={filme.movie.posterURL} alt="poster" />
                        </div>
                        <div>
                            <p><strong>{filme.movie.title}</strong></p>
                            <p>{filme.day.weekday} - {filme.name}</p>
                        </div>
                    </div>
                </FooterContainer>

            </PageContainer>
        )
    }
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        width: 225px;
        height: 42px;
        margin-top: 20px;
        font-size: 15px;
        align-self: center;
        background: #E8833A;
        color: #FFFFFF;
        border-radius: 3px;
        border: none;
    }
    input {
        height: 2em;
        width: calc(100vw - 60px);
    }
    &:nth-child() {
        margin-top: 10px;
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${ (props => props.borda)};
    background-color: ${ (props => props.fundo)};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
        border: 1px solid ${ (props => {
            if (props.selecionado.includes(props.indice))
                return '#0E7D71'
            else if (props.status)
                return '#808F9D'
            else
                return '#F7C52B'
        }
        )};
        background-color: ${(props => {
            if (props.selecionado.includes(props.indice))
                return '#1AAE9E'
            else if (props.status)
                return '#C3CFD9'
            else
                return '#FBE192'
        })};
        height: 25px;
        width: 25px;
        border-radius: 25px;
        font-family: 'Roboto';
        font-size: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px 3px;
        button {
            border: none;
            background:none;
        }
`


const FooterContainer = styled.div`
    left: 0;
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 12px;
        img {
            border-radius: 3px;
            background-color: white;
            box-shadow: 0px 2px 4px 2px #0000001A;
            width: 50px;
            height: 70px;   
            padding: 8px;
        }
`