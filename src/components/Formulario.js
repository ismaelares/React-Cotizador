import React, {useState} from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan} from '../helper';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    border: none;
    margin-top: 2rem;
    transition: background-color .3s ease;

    &:hover{
        cursor: pointer;
        background-color: #26C5DA;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;


const Formulario = ({guardarResumen, guardarCargando}) => {
    const [datos, guardarDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });
    const [error, guardarError] = useState(false);

    //Extraer valores del state
    const { marca, year, plan} = datos;

    //leer los datos del formulario
    const obtenerinfomacion = e =>{
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    //submit formulario
    const cotizarSeguro = e =>{
        e.preventDefault()

        if(marca.trim() === '' || year.trim() ==='' || plan.trim() === '')
        {
            guardarError(true);
            return;
        }

        guardarError(false);
        //Una base de 2000
        let resultado = 2000;

        //Obtener diferencia por año
        const diferencia = obtenerDiferenciaYear(year);
        //por cada año restar el 3%

        resultado -= ((diferencia * 3 ) * resultado )/ 100;
        //americano 15
        //asiatico 5
        //europero 30
        resultado = calcularMarca(marca) * resultado;

        //basico aumenta 20%
        //Completo 50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
        //total
        guardarCargando(true);

        setTimeout(() => {
            guardarCargando(false);
            guardarResumen({
                cotizacion: resultado,
                datos
            });
        }, 3000);


    }
    return ( 

        <form
            onSubmit={cotizarSeguro}
        >
            {error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name='marca'
                    value={marca}
                    onChange={obtenerinfomacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select
                    name='year'
                    value={year}
                    onChange={obtenerinfomacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === 'basico'}
                    onChange={obtenerinfomacion}
                />Básico
                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === 'completo'}
                    onChange={obtenerinfomacion}
                />Completo
                
            </Campo>
            <Boton
             type="submit"
            >Cotizar</Boton>
        </form>

    );
}

export default Formulario;