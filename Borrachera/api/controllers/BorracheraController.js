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

                Borrachera.create({

                    motivo: parametros.motivo,
                    usuBorrachera: parametros.usuBorrachera,
                    latitudDondeEmpezo: parametros.latitudDondeEmpezo,
                    longitudDondeEmpezo: parametros.longitudDondeEmpezo

                }).exec(function (error, borracheraCreada){

                    if (error) { return res.serverError(); }

                    sails.log.info(borracheraCreada);
                    Usuario.find().populate('UsuariosBorracheras').exec(function(error,usuariosEncontrados){
                        if(error) return res.serverError();
                        return res.view('vistas/Borrachera/ListarBorrachera', {
                            title: 'borracheras',
                            tituloError: '',
                            usuarios: usuariosEncontrados
                        });
                    })
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
        }
    },
    
    editarBorrachera: function(req, res){
         var parametros = req.allParams();
        console.log(parametros);
        if(req.method == 'POST'){
            if(parametros.motivo && parametros.usuBorrachera){

                Usuario.update({
    }
};

