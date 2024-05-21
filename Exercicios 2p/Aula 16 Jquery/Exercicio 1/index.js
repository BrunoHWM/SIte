$(document).ready(function(){
    $.getJSON("dados.json")
    .done(function(dados){
        $.each(dados, function(curso, alunos){
            var liCurso = $('<li>').text(curso);
            var olAlunos = $('<ol>');

            $.each(alunos, function(index, aluno){
                var liAluno = $('<li>').text(aluno);
                olAlunos.append(liAluno);
            });

            liCurso.append(olAlunos);
            $('#lista-alunos').append(liCurso);
        });
    })
    .fail(function(error){
        console.error(error);
    });
});
