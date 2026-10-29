const db = require('../config/db');

exports.listar = async (req, res) => {
  const { usuario_id } = req.query;
  if (!usuario_id) {
    return res.status(400).json({ erro: 'Informe o usuario_id.' });
  }
  try {
    const [linhas] = await db.query(
      `SELECT id, usuario_id, DATE_FORMAT(data_registro, '%d/%m/%Y') AS data,
              humor, energia, sono_horas, ansiedade, irritabilidade, observacao
       FROM registros_afetivograma
       WHERE usuario_id = ?
       ORDER BY data_registro DESC, id DESC`,
      [usuario_id]
    );
    res.json(linhas);
  } catch (e) {
    console.error(e);
    res.status(500).json({ erro: 'Erro ao buscar registros.' });
  }
};

exports.criar = async (req, res) => {
  const { usuario_id, humor, energia, sono_horas, ansiedade, irritabilidade, observacao } = req.body;

  if (!usuario_id || humor === undefined || energia === undefined ||
      sono_horas === undefined || ansiedade === undefined || irritabilidade === undefined) {
    return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
  }
  if (humor < -3 || humor > 3) {
    return res.status(400).json({ erro: 'O humor deve estar entre -3 e 3.' });
  }

  try {
    const [r] = await db.query(
      `INSERT INTO registros_afetivograma
       (usuario_id, data_registro, humor, energia, sono_horas, ansiedade, irritabilidade, observacao)
       VALUES (?, CURDATE(), ?, ?, ?, ?, ?, ?)`,
      [usuario_id, humor, energia, sono_horas, ansiedade, irritabilidade, observacao || null]
    );
    res.status(201).json({ id: r.insertId, mensagem: 'Registro salvo.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ erro: 'Erro ao salvar registro.' });
  }
};