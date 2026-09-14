import { supabase } from './supabase';
import './app.css'

function App() {

    async function teste() {
        const { data, error } = await supabase.from('products').select()
        console.log(data)
    }

    return ( 
        <div>
            <h1> Conexão Supabase </h1>
            <button onClick={teste} > Teste </button>
        </div>
     );
}

export default App;