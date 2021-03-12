const fotografias = require('../models').fotografias;
const fs = require('fs');
const thumb = require('node-thumbnail').thumb;
const path = require('path');

function create(req, res) {
    var body = req.body;

    fotografias.create(body)
        .then(fotografias => {
            res.status(200).send({ fotografias });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al guardar la fotografia papi" });
        })
}

function update(req, res) {

    var id = req.params.id; //id para saber que registro vamos a actualizar
    var body = req.body; //body para pasarlo como parametro

    fotografias.findByPk(id) //Busqueda en el modelo (en la tabla) por id
        .then(fotografia => { //recibimos el objeto en 'fotografia'
            //metodo de sequelize 'update'
            fotografia.update(body)
                .then(() => {
                    res.status(200).send({ fotografia }); //enviamos el objeto que actualizamos 'fotografia'
                })
                .catch(err => { //error al actualizar
                    res.status(500).send({ message: "ocurrio un error al actualizar la fotografia" });
                })
        })
        .catch(err => { //error al buscar
            res.status(500).send({ message: "ocurrio un error al buscar la fotografia" });
        })

}

function uploadFotografia(req, res) {

    var id = req.params.id;
    //Si tenemos archivos
    if (req.files) {
        //ruta del archivo que estamos subiendo
        var file_path = req.files.foto.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[3];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'jpg') {
            //Guardar el archivo en la BD
            var foto = {};
            foto.imagen = file_name;

            fotografias.findByPk(id)
                .then(fotografia => {
                    fotografia.update(foto)

                    .then(() => {

                            var newPath = './server/uploads/fotografias/' + file_name;
                            var thumbPath = './server/uploads/fotografias/thumbs';

                            thumb({
                                source: path.resolve(newPath),
                                destination: path.resolve(thumbPath),
                                width: 200,
                                suffix: ''
                            }).then(() => {
                                res.status(200).send({ fotografia });
                            }).catch(err => {
                                res.status(500).send({ message: "Ocurrio un error al crear el thumbnail mi pana" });
                            });


                        })
                        .catch(err => {
                            fs.unlink(file_path, (err) => {
                                if (err) {
                                    res.status(500).send({ message: "Ocurrio un error al eliminar el archivo mi pana" });
                                }
                            })
                            res.status(500).send({ message: "Ocurrio un error al actualizar la foto" });
                        })
                })
                .catch(err => {
                    fs.unlink(file_path, (err) => {
                        if (err) {
                            res.status(500).send({ message: "Ocurrio un error al eliminar el archivo mi pana" });
                        }
                    })
                    res.status(500).send({ message: "Ocurrio un error al buscar la foto" });
                })
        } else {
            fs.unlink(file_path, (err) => {
                if (err) {
                    res.status(500).send({ message: "Ocurrio un error al eliminar el archivo mi pana" });
                }
            })
            res.status(500).send({ message: "La extension no es valida apa" });
        }
    } else {
        res.status(400).send({ message: "Debes de seleccionar " });
    }
}

function getFotografia(req, res) {
    //Que fotografia queremos
    var fotografia = req.params.fotografia;
    var thumb = req.params.thumb;

    if (thumb == "false")
        var path_foto = './server/uploads/fotografias/' + fotografia; //Ruta de la foto
    else if (thumb == "true")
        var path_foto = './server/uploads/fotografias/thumbs/' + fotografia; //Ruta de la foto


    //Verificar el archivo exista en el servidor
    fs.exists(path_foto, (exists) => {
            if (exists) {
                res.sendFile(path.resolve(path_foto));
            } else {
                res.status(404).send({ message: "No se encuentra la fotografía apa." });
            }
        }) //Ruta de donde queremos la foto
}

//Listar todas la fotos pana
function getAll(req, res) {
    fotografias.findAll({
            where: {
                activo: true,
            },
            order: [
                ['numero', 'ASC']
            ]
        })
        .then(fotografias => {
            res.status(200).send({ fotografias });
        })
        .catch(err => {
            res.status(500).send({ message: "ocurrio un error al buscar las fotografias wachin" });
        })
}

function getById(req, res) {
    var id = req.params.id;

    fotografias.findByPk(id)
        .then(fotografias => {
            res.status(200).send({ fotografias });
        })
        .catch(err => {
            res.status(500).send({ message: "ocurrio un error al buscar una fotografias wachin" });
        })
}

function getAllAdmin(req, res) {
    fotografias.findAll({
            order: [
                ['numero', 'ASC']
            ]
        })
        .then(fotografias => {
            res.status(200).send({ fotografias });
        })
        .catch(err => {
            res.status(500).send({ message: "ocurrio un error al buscar las fotografias wachin" });
        })
}
module.exports = {
    create,
    update,
    uploadFotografia,
    getFotografia,
    getAll,
    getAllAdmin,
    getById
}