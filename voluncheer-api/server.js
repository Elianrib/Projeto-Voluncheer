require('dotenv').config();
const express = require('express');
const cors = require('cors');

const voluntariosRoutes = require('./src/routes/voluntarios');
const ongsRoutes       = require('./src/routes/ongs');
const eventosRoutes    = require('./src/routes/eventos');
const inscricoesRoutes = require('./src/routes/inscricoes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    projeto: 'Voluncheer API',
    versao: '1.0.0',
    rotas: {
      'POST /voluntarios/cadastro': 'Cadastrar voluntário',
      'POST /voluntarios/login':    'Login voluntário → JWT',
      'GET  /voluntarios':          'Listar voluntários [AUTH]',
      'GET  /voluntarios/:id':      'Buscar voluntário [AUTH]',
      'PUT  /voluntarios/:id':      'Atualizar voluntário [AUTH]',
      'DELETE /voluntarios/:id':    'Deletar voluntário [AUTH]',
      'POST /ongs/cadastro':        'Cadastrar ONG',
      'POST /ongs/login':           'Login ONG → JWT',
      'GET  /ongs':                 'Listar ONGs (público)',
      'GET  /ongs/:id':             'Buscar ONG (público)',
      'PUT  /ongs/:id':             'Atualizar ONG [AUTH]',
      'DELETE /ongs/:id':           'Deletar ONG [AUTH]',
      'POST /eventos':              'Criar evento [AUTH - ONG]',
      'GET  /eventos':              'Listar eventos (público)',
      'GET  /eventos/:id':          'Buscar evento (público)',
      'DELETE /eventos/:id':        'Deletar evento [AUTH - ONG]',
      'POST /inscricoes':           'Inscrever em evento [AUTH - voluntário]',
      'GET  /inscricoes/minha':     'Minhas inscrições [AUTH - voluntário]',
      'DELETE /inscricoes/:id':     'Cancelar inscrição [AUTH]',
    }
  });
});

app.use('/voluntarios', voluntariosRoutes);
app.use('/ongs',        ongsRoutes);
app.use('/eventos',     eventosRoutes);
app.use('/inscricoes',  inscricoesRoutes);

app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada.' }));

app.listen(PORT, () => {
  console.log(`\n🚀 Voluncheer API rodando em http://localhost:${PORT}`);
  console.log(`📄 Rotas disponíveis: http://localhost:${PORT}/\n`);
});

module.exports = app;
