/**
 * BorracheraController
 *
 * @description :: Server-side logic for managing Borracheras
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    crearBorrachera: function (req, res) {
        var parametros = req.allParams();
        console.log(parametros);
        if(req.method == 'POST'){
            if(parametros.motivo && parametros.usuBorrachera ){
                if (parametros.latitudDondeEmpezo == ''){
                    delete parametros.latitudDondeEmpezo }

                if (parametros.longitudDondeEmpezo == ''){
                    delete parametros.longitudDondeEmpezo }

                Borrachera.create({
                    motivo: parametros.motivo,
                    usuBorrachera: parametros.usuBorrachera,
                    latitudDondeEmpezo: parametros.latitudDondeEmpezo,
                    longitudDondeEmpezo: parametros.longitudDondeEmpezo
                }).exec(function (error, borracheraCreada){
                    if (error) {
                        return res.view('error',{
                            title: 'Borrachera',
                            tituloError: 'error',
                            error: 'No se ha podido crear la borrachera. Error del servidor: '+res.serverError(),
                            url: '/crearBorrachera'
                        })
                    } else {
                        Usuario.find().populate('UsuariosBorracheras').exec(function(error,usuariosEncontrados){
                            if (error) {
                                return res.view('error',{
                                    title: 'Borrachera',
                                    tituloError: 'error',
                                    error: res.serverError(),
                                    url: '/borracheras'
                                })
                            }
                            return res.view('vistas/Borrachera/ListarBorrachera', {
                                title: 'Borracheras',
                                tituloError: '',
                                usuarios: usuariosEncontrados
                            });
                        })
                    }
                })
            } else {
                return res.view('error',{
                    title: 'Borrachera',
                    tituloError: 'error',
                    error: 'No se envian parametros obligatorios.',
                    url: '/crearBorrachera'
                })
            }
        }
    },

    borrarBorrachera: function(req, res) {
        var parametros = req.allParams();
        console.log(parametros);
        if(parametros.idBorrachera){
            Borrachera.destroy({
                idBorrachera:parametros.idBorrachera
            }).exec(function(error,borracheraEliminada){
                if (error) return res.serverError();
                Usuario.find().populate('UsuariosBorracheras').exec(function(error,usuariosEncontrados){
                    if(error) return res.serverError();
                    return res.view('vistas/Borrachera/ListarBorrachera', {
                        title: 'borracheras',
                        tituloError: '',
                        usuarios: usuariosEncontrados
                    });
                })
            })
        } else {
            return res.view('error',{
                title: 'Borrachera',
                tituloError: 'error',
                error: 'No se envian parametros obligatorios.',
                url: '/borracheras'
            })
        }
    },

    editarBorrachera: function(req, res){
        var parametros = req.allParams();
        console.log(parametros);
        if(req.method == 'POST'){
            if(parametros.idBorrachera){
                Borrachera.update({
                    idBorrachera: parametros.idBorrachera
                },{                    
                    motivo: parametros.motivo,
                    usuBorrachera: parametros.usuBorrachera,
                    latitudDondeEmpezo: parametros.latitudDondeEmpezo,
                    longitudDondeEmpezo: parametros.longitudDondeEmpezo
                }).exec(function(error,BorracheraEditada){
                    if (error) {
                        return res.view('error',{
                            title: 'Borracheras',
                            tituloError: 'error',
                            error: 'No se ha podido actualizar la borrachera. Error del servidor: '+res.serverError(),
                            url: '/borracheras'
                        })
                    }
                    Usuario.find().populate('UsuariosBorracheras').exec(function (error, usuariosEncontrados){
                        return res.view('vistas/Borrachera/listarBorrachera',{
                            usuarios: usuariosEncontrados,
                            title: 'borracheras',
                            tituloError: ''
                        })
                    })

                })
            } else {
                return res.view('error',{
                    title: 'Borrachera',
                    tituloError: 'error',
                    error: 'No se envian parametros obligatorios.',
                    url: '/borracheras'
                })
            }
        }
    }
};

