import { db } from '../db.js';

export const getUsers = (_, res) => {
    const q = 'SELECT * FROM user';

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const { name, email, fone } = req.body;

    // Verificar se o email ou telefone já existem
    const checkQuery =
        'SELECT COUNT(*) AS count FROM user WHERE email = ? OR fone = ?';
    db.query(checkQuery, [email, fone], (err, results) => {
        if (err) return res.status(500).json(err);

        const count = results[0].count;
        if (count > 0) {
            return res
                .status(400)
                .json('Email ou telefone já existem no sistema.');
        }

        // Se não existir, inserir o novo usuário
        const insertQuery =
            'INSERT INTO user(`name`, `email`, `fone`) VALUES(?, ?, ?)';
        const values = [name, email, fone];

        db.query(insertQuery, values, (err) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json('Usuário criado com sucesso.');
        });
    });
};

export const updateUser = (req, res) => {
    const { name, email, fone } = req.body;
    const userId = req.params.id;

    // Verificar se o email ou telefone já existem para outros usuários
    const checkQuery =
        'SELECT COUNT(*) AS count FROM user WHERE (email = ? OR fone = ?) AND id <> ?';
    db.query(checkQuery, [email, fone, userId], (err, results) => {
        if (err) return res.status(500).json(err);

        const count = results[0].count;
        if (count > 0) {
            return res
                .status(400)
                .json('Email ou telefone já existem para outro usuário.');
        }

        // Se não existir, atualizar o usuário
        const updateQuery =
            'UPDATE user SET `name` = ?, `email` = ?, `fone` = ? WHERE `id` = ?';
        const values = [name, email, fone, userId];

        db.query(updateQuery, values, (err) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json('Usuário atualizado com sucesso.');
        });
    });
};

export const deleteUser = (req, res) => {
    const userId = req.params.id;
    const deleteQuery = 'DELETE FROM user WHERE `id` = ?';

    db.query(deleteQuery, [userId], (err) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json('Usuário deletado com sucesso.');
    });
};
