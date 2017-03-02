/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
     home: function (req, res) {

        // res.view(String: Nombre vista, Datos JSON)
        return res.view('homepage',{
            title: 'home',
            tituloError: ''
        })

    },
    
    crearUsuario: function (req, res) {

        return res.view('vistas/Usuario/crearUsuario');
    },
	
    listarUsuarios: function (req, res) {

        Usuario.find()
            .exec(function (errorIndefinido, usuariosEncontrados) {

//                if (errorIndefinido) {
//                    res.view('vistas/Error', {
//                        error: {
//                            desripcion: "Hubo un problema cargando los Usuarios",
//                            rawError: errorIndefinido,
//                            url: "/ListarUsuarios"
//                        }
//                    });
//                }

                return res.view('vistas/Usuario/ListarUsuarios', {
                    usuarios: usuariosEncontrados
                });
            })
    },
    
    editarUsuario: function(req, res) {
        var parametros = req.allParams();
        if(parametros.idUsuario){
            Usuario.findOne({
                idUsuario: parametros.idUsuario
            }).exec(function(error,usuarioEncontrado){
                if (error) return res.serverError()
                sails.log.info(usuarioEncontrado);
                return res.view('vistas/Usuario/EditarUsuario',{
                    title: 'Editar Usuario',
                    tituloError: '',
                    usuarioEditar: usuarioEncontrado
                })
                
            })
        }
    },
    
    crearBorrachera: function (req, res) {
        Usuario.find().exec(function(error, usuariosEncontrados){
            return res.view('vistas/Borrachera/crearBorrachera',{
                usuarios: usuariosEncontrados
            })
        })
        
    },
    
    listarBorracheras: function(req, res) {
        Usuario.find().populate('UsuariosBorracheras').exec(function (error, usuariosEncontrados){
            return res.view('vistas/Borrachera/listarBorrachera',{
                usuarios: usuariosEncontrados,
            })
        })
    },
};

