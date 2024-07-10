document.getElementById('habilitarAgendamento').addEventListener('change', function() {
    const isEnabled = this.checked;
    const agendamentoCampos = document.getElementById('agendamentoCampos');
    if (isEnabled) {
      agendamentoCampos.classList.remove('d-none');
    } else {
      agendamentoCampos.classList.add('d-none');
    }
  });
  
  document.getElementById('gerar').addEventListener('click', function() {
    const nomeCompleto = document.getElementById('nome').value;
    const primeiroNome = nomeCompleto.split(' ')[0];
    const sexo = document.querySelector('input[name="sexo"]:checked') ? document.querySelector('input[name="sexo"]:checked').value : '';
    const clienteNovo = document.getElementById('clienteNovo').checked;
    const habilitarAgendamento = document.getElementById('habilitarAgendamento').checked;
    const dataAgendamento = document.getElementById('dataAgendamento').value;
    const horaAgendamento = document.getElementById('horaAgendamento').value;
  
    if (!nomeCompleto || !sexo) {
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
  
    const respostas = [
      {
        titulo: 'Resposta Base',
        texto: saudacaoPadrao
      },
      {
        titulo: 'Introdução',
        texto: `${saudacaoPadrao}\nComo posso ajudar ${pronome} hoje?`
      },
      {
        titulo: 'Solicitação de prorrogação',
        texto: `${saudacaoPadrao}\nFoi realizado o pedido de prorrogação ${pronomesolicitacao} ${pronome}. O resultado sai hoje após as 20:00, caso queira acompanhar no aplicativo "Meu INSS", ou então, amanhã pela manhã entro em contato para avisar.`
      },
      {
        titulo: 'Andamento de processo (sem novidade)',
        texto: `${saudacaoPadrao}\nVerifiquei o seu processo, e até o presente momento não temos novidades.\nAssim que houver alguma atualização no processo ${pronomesolicitacao} ${pronome}, eu entro em contato para avisar, tudo bem?`
      },
      {
        titulo: 'Nome',
        texto: `${saudacao}, tudo bem?\nEu sou o Victor, auxiliar, faço parte da equipe do Dr. Guilherme.\nQual o seu nome completo, por favor.`
      }
    ];
  
    if (habilitarAgendamento) {
      const dataFormatada = formatarDataBrasileira(dataAgendamento);
      respostas.push({
        titulo: 'Agendamento',
        texto: `${saudacaoPadrao}\nSobre o que seria o seu agendamento?\nEu tenho um horário disponível para o dia ${dataFormatada} às ${horaAgendamento}, pode ser?`
      });
    }
  
    if (clienteNovo) {
      respostas.push({
        titulo: 'Documentos Necessários',
        texto: 'Para clientes novos, favor trazer os seguintes documentos:\n- Documento de identidade (RG ou CNH)\n- Comprovante de residência\n- CPF\n- Cartão do SUS (se tiver)\n- Certidão de nascimento ou casamento\n- Outros documentos relevantes'
      });
    }
  
    const respostaContainer = document.getElementById('respostaContainer');
    respostaContainer.innerHTML = '';
  
    respostas.forEach(resposta => {
      const respostaCol = document.createElement('div');
      respostaCol.classList.add('col-md-4', 'resposta-item');
  
      const respostaBox = document.createElement('div');
      respostaBox.classList.add('resposta-box');
  
      const respostaTitulo = document.createElement('h3');
      respostaTitulo.textContent = resposta.titulo;
  
      const respostaTexto = document.createElement('p');
      respostaTexto.innerHTML = resposta.texto.replace(/\n/g, '<br>');
  
      const botaoCopiar = document.createElement('button');
      botaoCopiar.classList.add('btn', 'btn-secondary');
      botaoCopiar.innerHTML = '<i class="bi bi-clipboard"></i> Copiar';
      botaoCopiar.addEventListener('click', () => copiarTexto(resposta.texto));
  
      respostaBox.appendChild(respostaTitulo);
      respostaBox.appendChild(botaoCopiar);
      respostaBox.appendChild(respostaTexto);
  
      respostaCol.appendChild(respostaBox);
      respostaContainer.appendChild(respostaCol);
    });
  });
  
  function formatarDataBrasileira(data) {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/2024`;
  }
  
  function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(() => {
      alert('Texto copiado para a área de transferência.');
    });
  }
  
  document.getElementById('searchTitulo').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const respostaItems = document.querySelectorAll('.resposta-item');
  
    respostaItems.forEach(item => {
      const titulo = item.querySelector('h3').textContent.toLowerCase();
      if (titulo.includes(searchValue)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
  