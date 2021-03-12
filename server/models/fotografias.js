module.exports = (sequelize, DataTypes) => {
    const fotografias = sequelize.define('fotografias', {
        //Campos de nuestra tabla
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        fotografia: DataTypes.STRING, //nombre de la foto
        descripcion: DataTypes.STRING,
        imagen: DataTypes.STRING, //ruta
        activo: DataTypes.BOOLEAN,
        numero: DataTypes.INTEGER,
        autor: DataTypes.STRING,
        usuario_creacion: DataTypes.STRING,
    });

    return fotografias;
}