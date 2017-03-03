/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    home: function (req, res) {
        return res.view('homepage',{
            title: 'Home',
            tituloError: ''
        })
    },

    crearUsuario: function (req, res) {
        return res.view('vistas/Usuario/crearUsuario',{
            title: 'Crear Usuario'
        });
    },

    listarUsuarios: function (req, res) {
        Usuario.find().exec(function (error, usuariosEncontrados) {
            if (error) {
                return res.view('error',{
                    title: 'Usuarios',
                    tituloError: 'error',
                    error: 'No se han podido cargar los usuarios',
                    url: '/'
                })
            } else {
                return res.view('vistas/Usuario/ListarUsuarios', {
                    title: 'Listar Usuarios',
                    usuarios: usuariosEncontrados
                });
            }    
        })
    },

    editarUsuario: function(req, res) {
        var parametros = req.allParams();
        if(parametros.idUsuario){
            Usuario.findOne({
                idUsuario: parametros.idUsuario
            }).exec(function(error,usuarioEncontrado){
                if (error) {
                    return res.view('error',{
                        title: 'Usuarios',
                        tituloError: 'error',
                        error: 'No se han podido encontrar el usuario. Error servidor: '+res.serverError(),
                        url: '/'
                    })
                } else {
                    return res.view('vistas/Usuario/EditarUsuario',{
                        title: 'Editar Usuario',
                        tituloError: '',
                        usuarioEditar: usuarioEncontrado
                    })
                }

            })
        }
    },

    crearBorrachera: function (req, res) {
        Usuario.find().exec(function(error, usuariosEncontrados){
            if (error) {
                return res.view('error',{
                    title: 'Borracheras',
                    tituloError: 'error',
                    error: 'No se ha podido cargar los usuarios. Error servidor: '+res.serverError(),
                    url: '/'
                })
            } else {
                return res.view('vistas/Borrachera/crearBorrachera',{
                    title: 'Crear Borrachera',
                    usuarios: usuariosEncontrados
                });
            }
        })
    },

    listarBorracheras: function(req, res) {
        Usuario.find().populate('UsuariosBorracheras').exec(function (error, usuariosEncontrados){
            if (error) {
                return res.view('error',{
                    title: 'Borracheras',
                    tituloError: 'error',
                    error: 'No se ha podido cargar los usuarios. Error servidor: '+res.serverError(),
                    url: '/'
                })
            } else {
                return res.view('vistas/Borrachera/listarBorrachera',{
                    title: 'Listar Borracheras',
                    usuarios: usuariosEncontrados,
                })
            }            
        })
    },

    editarBorrachera: function(req, res) {
        var parametros = req.allParams();
        if(parametros.idBorrachera){
            Borrachera.findOne({
                idBorrachera:parametros.idBorrachera
            }).exec(function(error,borracheraEncontrada){
                if (error) {
                    return res.view('error',{
                        title: 'Borrachera',
                        tituloError: 'error',
                        error: 'LA borrachera no se ha podido encontrar. Error servidor: '+res.serverError(),
                        url: '/'
                    })
                } else {
                    Usuario.find().exec(function(error, usuariosEncontrados){
                        return res.view('vistas/Borrachera/EditarBorrachera',{
                            title: 'Editar Borrachera',
                            tituloError: '',
                            usuarios: usuariosEncontrados,
                            borrachera: borracheraEncontrada,
                            seleccionado: parametros.idUsuario
                        })
                    })
                }
            })
        }
    }
};

