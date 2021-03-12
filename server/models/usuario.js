module.exports = (sequelize, DataTypes) => {
    const usuarios = sequelize.define('usuarios', {
        //Campos de nuestra tabla
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        usuario: DataTypes.STRING,
        password: DataTypes.STRING,
        id_rol: DataTypes.INTEGER,
        activo: DataTypes.BOOLEAN,
        usuario_creacion: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });

    return usuarios;
}