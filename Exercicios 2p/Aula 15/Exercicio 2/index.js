fetch("usuarios.json")
    .then(response => response.json())
    .then(data => {
        const pessoas = data.Pessoas; // Acesso ao array de pessoas dentro do objeto data

        const listaUsuarios = document.getElementById("lista-usuarios");

        pessoas.forEach(pessoa => {
            const usuarioDiv = document.createElement("ol");

            const nomeP = document.createElement("li");
            nomeP.textContent = "Nome: " + pessoa.Nome; // Acessando o nome dentro de cada pessoa
            usuarioDiv.appendChild(nomeP);

            const idadeP = document.createElement("li");
            idadeP.textContent = "Idade: " + pessoa.Idade; // Acessando a idade dentro de cada pessoa
            usuarioDiv.appendChild(idadeP);

            const cpfP = document.createElement("li");
            cpfP.textContent = "CPF: " + pessoa.CPF; // Acessando o CPF dentro de cada pessoa
            usuarioDiv.appendChild(cpfP);

            const telefoneP = document.createElement("li");
            telefoneP.textContent = "Telefone: " + pessoa["Numero-Telefone"]; // Acessando o telefone dentro de cada pessoa
            usuarioDiv.appendChild(telefoneP);

            listaUsuarios.appendChild(usuarioDiv);
        });
    })
    .catch(error => console.error(error));
