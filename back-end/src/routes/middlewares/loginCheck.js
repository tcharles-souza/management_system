const { selectAll } = require('../../db/queries/usuarios_sql');

const loginCheck = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const [users] = await selectAll();

    const check = users.some((user) => user.usuario === username && user.senha === password);

    if (check) {
      res.status(200).json({ authentication: true });
      return;
    }

    res.status(401).json({ authentication: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = loginCheck;
