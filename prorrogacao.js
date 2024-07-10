document.getElementById('gerar').addEventListener('click', function() {
    const nomeCompleto = document.getElementById('nome').value;
    const primeiroNome = nomeCompleto.split(' ')[0];
    const sexo = document.querySelector('input[name="sexo"]:checked') ? document.querySelector('input[name="sexo"]:checked').value : '';
    const dataCessacao = document.getElementById('dataCessacao').value;
    const numeroBeneficio = document.getElementById('numeroBeneficio').value;
  
    if (!nomeCompleto || !sexo || !dataCessacao || !numeroBeneficio) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    const horaAtual = new Date().getHours();
    let saudacao = '';
  
    if (horaAtual >= 7 && horaAtual <= 12) {
      saudacao = 'Bom dia';
    } else if (horaAtual >= 12 && horaAtual <= 18) {
      saudacao = 'Boa tarde';
    } else if (horaAtual >= 18 && horaAtual <= 24) {
      saudacao = 'Boa noite';
    }
  
    const pronome = sexo === 'masculino' ? 'Sr.' : 'Sra.';
    const pronomesolicitacao = sexo === 'masculino' ? 'do' : 'da';
  
    const saudacaoPadrao = `${saudacao} ${pronome} ${primeiroNome}, tudo bem?\nEu sou o Victor, auxiliar, faço parte da equipe do Dr. Guilherme.`;

    const dataFormatada = formatarDataBrasileira(dataCessacao);
    const dataLembrete = calcularDataLembrete(dataCessacao);
  
    const respostaProrrogacao = `${saudacaoPadrao}\nO benefício ${pronomesolicitacao} ${pronome} foi prorrogado até o dia ${dataFormatada}. Vou solicitar que entre em contato 15 dias antes, para que eu possa pedir a prorrogação novamente.`;
  
    const respostaPedido = `Fazer pedido de prorrogação - Benefício n° ${numeroBeneficio} (Cessação ${dataFormatada}) - ${nomeCompleto}`;
  
    const respostaContainer = document.getElementById('respostaContainer');
    respostaContainer.innerHTML = '';
  
    const respostas = [
      {
        titulo: 'Prorrogação',
        texto: respostaProrrogacao
      },
      {
        titulo: 'Pedido de Prorrogação',
        texto: respostaPedido
      }
    ];
  
    respostas.forEach(resposta => {
      const respostaCol = document.createElement('div');
      respostaCol.classList.add('col-md-6', 'resposta-item');
  
      const respostaBox = document.createElement('div');
      respostaBox.classList.add('resposta-box');
  
      const respostaTitulo = document.createElement('h3');
      respostaTitulo.textContent = resposta.titulo;
  
      const respostaTexto = document.createElement('p');
      respostaTexto.innerHTML = resposta.texto.replace(/\n/g, '<br>');
  
      const botaoCopiar = document.createElement('button');
      botaoCopiar.classList.add('btn', 'btn-secondary');
      botaoCopiar.innerHTML = '<i class="fa fa-copy"></i> Copiar';
      botaoCopiar.addEventListener('click', () => copiarTexto(resposta.texto));
  
      const lembreteTexto = document.createElement('p');
      lembreteTexto.classList.add('text-danger');
      lembreteTexto.textContent = `Lembrete: Por favor, entre em contato até ${dataLembrete}`;
  
      respostaBox.appendChild(respostaTitulo);
      respostaBox.appendChild(botaoCopiar);
      respostaBox.appendChild(respostaTexto);
      respostaBox.appendChild(lembreteTexto);
  
      respostaCol.appendChild(respostaBox);
      respostaContainer.appendChild(respostaCol);
    });
  });
  
  function formatarDataBrasileira(data) {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/2024`;
  }
  
  function calcularDataLembrete(dataCessacao) {
    const partes = dataCessacao.split('-');
    const data = new Date(partes[0], partes[1] - 1, partes[2]);
    data.setDate(data.getDate() - 15);
  
    // Ajustar para o próximo dia útil se cair no final de semana
    if (data.getDay() === 6) { // Sábado
      data.setDate(data.getDate() + 2);
    } else if (data.getDay() === 0) { // Domingo
      data.setDate(data.getDate() + 1);
    }
  
    return formatarDataBrasileira(`${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}-${data.getDate().toString().padStart(2, '0')}`);
  }
  
  function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(() => {
      alert('Texto copiado para a área de transferência.');
    });
  }
  