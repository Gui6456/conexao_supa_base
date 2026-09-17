import { supabase } from "./supabase";
import { useEffect, useState } from "react";
import './Companies.css'

function Companies() {

    const [companies, setCompanies] = useState([])
    const [employees, setEmployees] = useState([])

    const [show_employees, setshowEmployees] = useState(false)
    const [show_companies, setshowCompanies] = useState(true)
    const [show_modal, setshowModal] = useState(false)

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

    async function search_employees_by_interprise (id_interprise) {

        const { error , data} = await supabase.from("employees").select('*,companies(*)').eq('id_interprise', id_interprise)
        console.log(data)
        setEmployees(data)
        change_view()
    }

    async function insert_employee() {
        <></>
    }

    function change_view () {

        if (show_companies == true) {
            setshowCompanies(false)
            setshowEmployees(true)
        } else {
            setshowCompanies(true)
            setshowEmployees(false)
        }
    }

    useEffect( ()=> {
        search_all_companies()
        search_all_employees()
    } , [])

        return ( 

            <div>

                <div className="titulo_sub" >
                    <h1> Relacionamento de Tabelas </h1>
                    <p> Consulta na tabela empresas e funcionários </p>
                </div>

                {   // Para as empresas

                   show_companies == true ?

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
                                            <td> <button onClick={ ()=> search_employees_by_interprise(i.id)}> Ver funcionários </button> </td>
                                        </tr>
                                    )
                                }
                            </table>
                        </div>
                    :
                        <></>
                }
                        
                {

                    show_modal == true ?
                    <div>
                        <div onClick={()=> setshowModal(false)} className="fundo_preto" ></div>

                        <div className="modal">
                            <h2>Novo Funcionário</h2>
                            <input placeholder="Nome..." />    <br/><br/>
                            <input placeholder="Contato..." />  <br/><br/>

                            <select>   
                                <option value="1"> Funcionário comum </option>   
                                <option value="0"> Administrador </option>
                            </select> <br/><br/>

                            <button onClick={insert_employee} > Salvar </button> 

                        </div>
                    </div>
                    :
                        <></>
                }

                    {
                        show_employees == true ?

                    <div>
                        
                        <h2> Funcionários </h2>
                        <button className="botao_voltar" onClick={change_view}> Voltar </button>
                        <button onClick={()=> setshowModal(true)} > Adicionar novo </button>

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
                                        <td> {i.companies.name} </td>  
                                        <td> {i.companies.address} </td>
                                        <td> {i.cargo == 0 ? 'Administrador' : 'Funcionário comum'} </td>
                                        <td> {i.contact} </td>
                                    </tr>
                                )
                            }

                        </table>
                    </div>

                        :
                            <></>
                }
                
            </div>
        );
}

export default Companies;