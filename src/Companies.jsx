import { supabase } from "./supabase";
import { useEffect, useState } from "react";
import './Companies.css'

function Companies() {

    const [companies, setCompanies] = useState([])
    const [employees, setEmployees] = useState([])

    async function search_all_companies (){
        const { error , data} = await supabase.from("companies").select()
        console.log(data)
        setCompanies(data)
    }

    async function search_all_employees (){
        const { error , data} = await supabase  
        .from("employees")  // Esse modo faz com que eu consiga acessar dentro de uma tabela, escolher o que quero mostrar, e entrar em outra tabela também
        .select(`     
            *,
            companies (
                name,
                address
            )
        `)

        console.log(data)
        setEmployees(data)
    }

    useEffect( ()=> {
        search_all_companies()
        search_all_employees()
    } , [])

        return ( 

            <div>

                <div className="titulo_sub" >
                    <h1> Empresas </h1>
                    <p>Consulta na tabela empresas e funcionários</p>
                </div>

                <div>
                    <table>
                        <tr>
                            <td> ID </td>
                            <td> Name </td>
                            <td> CNPJ </td>
                            <td> Address </td>
                        </tr>

                        {
                            companies.map( i => 
                                <tr>
                                    <td> {i.id} </td>
                                    <td> {i.name} </td>
                                    <td> {i.cnpj} </td>
                                    <td> {i.address} </td>
                                </tr>
                            )
                        }

                    </table>

                    <h2> Funcionários </h2>

                    <table>
                        <tr>
                            <td> ID </td>
                            <td> Name </td>
                            <td> Company Name </td>
                            <td> Company Address </td>
                            <td> Cargo </td>
                            <td> Contact </td>
                        </tr>

                        {

                            employees.map( i =>
                                <tr>
                                    <td> {i.id} </td>
                                    <td> {i.name} </td> {/* Isso faz com que eu navegue dentro da tabela de companies, e faça com que busque um item dentro da companies, dentro de name, caso não ache nao retorne nada */}
                                    <td> {i.companies ? i.companies.name : ""} </td>  
                                    <td> {i.companies ? i.companies.address : ""} </td>
                                    <td> {i.cargo} </td>
                                    <td> {i.contact} </td>
                                </tr>
                            )
                        }
                    </table>
                </div>

            </div>
        );
}

export default Companies;