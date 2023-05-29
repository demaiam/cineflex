import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";

export default function SuccessPage() {
    let dados = useLocation().state;
    const assentos = dados.selecionados;

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <div data-test="movie-info">
            <TextContainer>
                <strong>Filme e sessão</strong>
                <a>{dados.nomeFilme}</a>
                <a>{dados.diaFilme} - {dados.horaFilme}</a>
            </TextContainer>
            </div>

            <div data-test="seats-info">
            <TextContainer>
                <strong>Ingressos</strong>
                {assentos.map( seat => (
                    <a key={seat}>Assento {seat}</a>
                ))}
            </TextContainer>
            </div>
            
            <div data-test="client-info">
            <TextContainer>
                <strong>Comprador</strong>
                <a>Nome: {dados.nome}</a>
                <a>CPF: {dados.cpf}</a>
            </TextContainer>
            </div>
            
            <div data-test="go-home-btn">
            <Link to={`/`}>
                <button>Voltar para Home</button>
            </Link>
            </div>
            
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        width: 225px;
        height: 42px;
        margin-top: 50px;
        font-size: 15px;
        align-self: center;
        background: #E8833A;
        color: #FFFFFF;
        border-radius: 3px;
        border: none;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`