const Solicitud = require('../models/Solicitud');
const User = require('../models/User');
const Comercio = require('../models/Comercio');

const solicitudController = {};

solicitudController.getSolicitudes = async (req, res) => {
    const solicitud = await Solicitud.find({ estado: 'E' }).populate({ path: 'user' })
    const solicitudes = await Solicitud.populate(solicitud, { path: 'comercio' });
    res.json({ success: true, solicitudes });
}

solicitudController.getSolicitud = async (req, res) => {
    const user = await User.findOne({ username: req.params.username })
    const solicitudesUser = await Solicitud.find({ user: user._id }).populate({ path: 'user' })
    const solicitudesUserComercio = await Solicitud.populate(solicitudesUser, { path: 'comercio' });
    res.json({ success: true, solicitudes: solicitudesUserComercio });
}

solicitudController.postSolicitud = async (req, res) => {
    const solicitud = req.body;
    const user = await User.findOne({ username: solicitud.username });
    if(!user) res.json({success: false, msg: `El usuario ${solicitud.username} no existe`});
    const comercio = new Comercio(solicitud.comercio);
    console.log(solicitud, user)
    const newSolicitud = new Solicitud({
        user: user._id,
        comercio: comercio._id,
        descripcion: solicitud.desc
    });
    await newSolicitud.save();
    await comercio.save();
    res.json({ success: true, msg: `${user.nombre}, la solicitud de afilición del comercio "${comercio.nombre}" fue creada con exito!` });
}

solicitudController.procesarSolicitud = async (req, res) => {
    const solicitud = await Solicitud.findById(req.body.id);
    solicitud.estado = req.body.estado;
    await Solicitud.findByIdAndUpdate(req.body.id, solicitud)
    res.json({ success: true, msg: `La solicitud del afiliado fue ${solicitud.estado == 'R' ? '"Rechazada"' : '"Aceptada"'} Correctamente!` });
}

solicitudController.mostrarEstadoSolicitud = async (req, res) => {
    const solicitud = await Solicitud.findById(req.params.id);
    switch (solicitud.estado) {
        case 'E':
            res.json({ success: true, msg: `La solicitud esta siendo Procesada`, type: 'info' });
            break;
        case 'R':
            res.json({ success: true, msg: `La solicitud fue Rechazada`, type: 'error' });
            break;
        case 'A':
            res.json({ success: true, msg: `La solicitud fue Aceptada`, type: 'success' });
            break;
        default:
            res.json({ success: true, msg: `La solicitud esta en Error` });
            break;
    }
}

module.exports = solicitudController;