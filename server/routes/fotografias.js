const fotografiasController = require('../controllers').fotografias;
const md_auth = require('../authenticated/authenticated');

const cm = require('connect-multiparty');
const md_upload = cm({ uploadDir: './server/uploads/fotografias/' });

module.exports = (app) => {
    //Direccion por la cual accedemos al servicio
    app.post('/api/fotografia', fotografiasController.create);
    app.put('/api/fotografia/:id', fotografiasController.update);
    app.post('/api/upload-fotografia/:id', md_upload, fotografiasController.uploadFotografia);
    app.get('/api/get-fotografia/:fotografia/:thumb', fotografiasController.getFotografia);
    app.get('/api/fotografias', fotografiasController.getAll);
    app.get('/api/fotografias-admin', fotografiasController.getAllAdmin);
    app.get('/api/fotografia/:id', fotografiasController.getById);
}