const db = require('../models/index');
const role = db.role;

const showRole = async (req, res) => {
    await role.findAll({
        order: [
            ['Role_ID', 'ASC']
        ],
    })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
}

const addRole = async (req, res) => {
    const v_role = req.body.role;
    await role.create({ Role: v_role })
        .then(response => { res.send(response) })
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
}

const editRole = async (req, res) => {
    const v_role = req.body.role;
    const v_idRole = req.params.id;
    await role.update({ Role: v_role }, { where: { Role_ID: v_idRole } })
        .then(result => {
            if (result == 1)
                res.send("Role editado de forma exitosa")
            else {
                res.send("Ha ocurrido un error al tratar de editar el role")
            }
        })
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
}

const deleteRole = async (req, res) => {
    const v_idRole = req.params.id;
    await role.destroy({ where: { Role_ID: v_idRole } })
        .then(result => {
            if (result == 1)
                res.send("Role eliminado de forma exitosa")
            else {
                res.send("Ha ocurrido un error al tratar de eliminar el role")
            }
        })
        .catch(error => {
            res.status(204).json({ msg: error.message });
        });
}
module.exports = {
    showRole,
    addRole,
    editRole,
    deleteRole,
};