fetch("dados.json")
    .then(response => response.json())
    .then(dados => {
        for (const curso in dados) {
            const liCurso = document.createElement('li');
            liCurso.textContent = curso;

            const olAlunos = document.createElement('ol');

            for (const aluno of dados[curso]) {
                const liAlunos = document.createElement('li');
                liAlunos.textContent = aluno;

                olAlunos.appendChild(liAlunos);
            }

            liCurso.appendChild(olAlunos);
            document.getElementById('lista-alunos').appendChild(liCurso);
        }
    })
    .catch(
        error => console.error(error)
    )
