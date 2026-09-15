import { supabase } from './supabase';
import { useEffect, useState } from 'react';
import './app.css'

function App() {

    const [products, setProducts] = useState([])  // [] = array

    const [name, setName] = useState("")  // "" = string
    const [price, setPrice] = useState("")  // Com ctrl D, seleciona os semelhantes, dps ctrl shift e setinha (para o lado desejado), da pra copiar e colar diversas coisas parecidas
    const [size, setSize] = useState("")  
    const [description, setDescription] = useState("")  

    async function insert(){   /* Todo dado externo precisa ser colocado em uma função async, aqui dados serão inseridos */
        const object = {   // Esse formato é regra para todos os banco de dados
            name: name,
            price: price,
            size: size,
            description: description
            // Registro, ID e active já são configurados automanticamente, então não precisa colocar
        }

        const { data, error } = await supabase.from('products').insert(object)
        alert("CADASTROU")
        document.location.reload()
    }

    async function search_all() {
         // Aqui os dados serão selecionados e mostrados, além de organizar a ordem em que aparecem
        const { data, error } = await supabase.from('products').select().order('id', { ascending: false })
        console.log(data)
        setProducts(data)
    }

    // O useEffect chama automaticamente uma função colocada, nesse caso mostra todos os dados da supabase do banco logo na abertura do site
    useEffect( ()=> {   
        search_all()
    } , [] )

    return ( 
        <div>
            <h1> Conexão Supabase </h1>

            <input onChange={ e => setName(e.target.value)}placeholder="Nome do produto..." />
            <br/>
            
            <input onChange={ e => setPrice(e.target.value)}placeholder="Preço..." />
            <br/>

            <input onChange={ e => setSize(e.target.value)}placeholder="Tamanho..." />
            <br/>

            <input onChange={ e => setDescription(e.target.value)}placeholder="Descrição... (opcional) "/>
            <br/>

            <button onClick={insert} > Salvar </button>
            <br/>

            {
                products.map( i => <p> {i.name} R$ {i.price} | Descrição: {i.description}</p>)
            }

        </div>
     );
}
    
export default App;