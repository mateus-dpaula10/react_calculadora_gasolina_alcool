import { FormEvent, useState } from 'react'
import logoImg from './assets/logo.png'
import './App.css'

interface InfoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

export default function App() {
  const [inputAlcool, setInputAlcool] = useState(0)
  const [inputGasolina, setInputGasolina] = useState(0)
  const [info, setInfo] = useState<InfoProps>()

  function calculaValor(e: FormEvent) {
    e.preventDefault()
    
    let calculo = (inputAlcool / inputGasolina)

    if (calculo <= 0.7) {
      setInfo({
        title: "Compensa usar álcool",
        gasolina: formatarMoeda(inputGasolina),
        alcool: formatarMoeda(inputAlcool)
      })
    } else {
      setInfo({
        title: "Compensa usar gasolina",
        gasolina: formatarMoeda(inputGasolina),
        alcool: formatarMoeda(inputAlcool)
      })
    }
  }

  function formatarMoeda(valor: number) {
    let valorFormatado = valor.toLocaleString('pt-BR', {
      style: "currency",
      currency: "BRL"
    })

    return valorFormatado
  }

  return (
    <div>
      <div className="container">
        <img className="logo" src={logoImg} alt="Logo da calculadora" />
        <h1 className="title">Qual melhor opção?</h1>

        <form className="form" onSubmit={calculaValor}>
          <label>Álcool (preço por litro)</label>
          <input
            className="input"
            type="number"
            placeholder="4,99"
            min="1"
            step="0.01"
            required
            value={inputAlcool}
            onChange={ (e) => setInputAlcool(Number(e.target.value)) }
          />

          <label>Gasolina (preço por litro)</label>
          <input
            className="input"
            type="number"
            placeholder="4,99"
            min="1"
            step="0.01"
            required
            value={inputGasolina}
            onChange={ (e) => setInputGasolina(Number(e.target.value)) }
          />

          <input 
            type="submit"
            value="Calcular"
            className="button"
          />
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result_title">{info.title}</h2>

            <span>Álcool {info.alcool}</span>
            <span>Gasolina {info.gasolina}</span>
          </section>
        )}
      </div>
    </div>
  )
}
