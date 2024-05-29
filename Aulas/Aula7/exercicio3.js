var pessoas = ["João", "José", "Maria", "Sebastião", "Antônio"];
var nomesComQuatroLetras = pessoas.filter(function(nome) {
  return nome.length === 4;
});
console.log(nomesComQuatroLetras);  // ["João", "José"]
