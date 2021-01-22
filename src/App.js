//Importações para uso na Aplicação...
import React, { useState, useEffect } from "react";
import "./styles.css";
import api from './services/api';
/* ********************************************** */

//função componente para App
function App() {

  //useState - já estava importado no template (só usar)...
  const [repositories, setRepositories] = useState([]);

  //Uso da função useEffect/ReactJS
  useEffect(() => {
    api.get('/repositories').then(response => {
        setRepositories(response.data);
        console.log(response);
    })
  }, []);

  async function handleAddRepository() {

    //adicionar um novo repositório como <li> na interface
    const response = await api.post('repositories', 
    {
      title:`New Repo at ${Date.now()}`,
      url: 'https://github.com/mhpardo/gostack-desafio-conceitos-reactjs',
      owner:"Mario H S Pardo"
    });

    //Adicionando o novo repositório na resposta ao cliente
    const newRepo = response.data;

    //Recriando (imutabilidade) a base de repositórios (array repositories)
    setRepositories([...repositories, newRepo]);
  }

  async function handleRemoveRepository(id) {
    //Remover  repositório da lista a partir do id
    const response = await api.delete(`/repositories/${id}`, {});

    //remover o elemento do array repositories
    const pos = repositories.indexOf(id,1);  //descobre a posição
    console.log(`Tamanho do array antes da removação: ${repositories.length}`);
    repositories.splice(pos); //remove do array
    console.log(`Tamanho do array depois da removação: ${repositories.length}`);
    //recriando o objeto array - imutabilidade
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => <li key={repo.id}> {repo.title} 
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>)}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
