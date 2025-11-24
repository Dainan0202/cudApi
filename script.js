const API = 'http://localhost:3000/lancamentos'; 

async function carregar() { 
  const res = await fetch(API);
  const lista = await res.json();

  document.getElementById("lista").innerHTML =
    lista.map(t => `
      <li>
        ${t.Despesa_receita} - ${t.Categoria} - R$ ${t.Valor} // botão excluir 
        <button onclick="excluir('${t._id}')">Excluir</button> 
      </li>
    `).join("");
}

async function excluir(id) {
  const confirmar = confirm("Tem certeza que deseja excluir este lançamento?"); 
  if (!confirmar) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  carregar(); 
}

document.getElementById("transacao-form").addEventListener("submit", async e => { 
  e.preventDefault();

  const dados = {
    mes: document.getElementById("mes").value,
    Despesa_receita: document.getElementById("Despesa_receita").value,
    Categoria: document.getElementById("Categoria").value,
    Valor: Number(document.getElementById("Valor").value),            
    data_vencimento: document.getElementById("data_vencimento").value
  };

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(dados)
  });

  e.target.reset();
  carregar();
});

carregar();
//
