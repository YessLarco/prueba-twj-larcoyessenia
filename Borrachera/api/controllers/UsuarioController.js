/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    crearUsuario: function (req, res){
        var parametros = req.allParams();
        console.log(parametros);
        if(req.method == 'POST'){
            if(parametros.nombreUsuario && parametros.fechaNacimiento) {
                if (parametros.ciudadResidencia == '') {
                    delete parametros.ciudadResidencia }
                ms = Date.parse(parametros.fechaNacimiento);
                fecha = new Date(ms);

                Usuario.findOne({
                    nombreUsuario: parametros.nombreUsuario,
                    fechaNacimiento: parametros.fechaNacimiento
                }).exec(function(error,usuarioEncontrado){
                    if(usuarioEncontrado){
                        return res.view('error',{
                            title: 'Usuarios',
                            tituloError: 'error',
                            error: 'El usuario ya se encuentra registrado.',
                            url: '/crearUsuario'
                        })
                    } else {

                        Usuario.create({
                            nombreUsuario: parametros.nombreUsuario,
                            ciudadResidencia: parametros.ciudadResidencia,
                            fechaNacimiento: parametros.fechaNacimiento
                        }).exec(function (error, usuarioCreado){
                            if (error) {
                                return res.view('error',{
                                    title: 'Usuarios',
                                    tituloError: 'error',
                                    error: 'No se ha podido crear el usuario. Error del servidor: '+res.serverError(),
                                    url: '/crearUsuario'
                                })
                            } else {
                                Usuario.find()
                                    .exec(function (error, usuariosEncontrados) {
                                    if (error) {
                                        return res.view('error',{
                                            title: 'Usuarios',
                                            tituloError: 'error',
                                            error: 'No se ha podido cargar los usuarios. Error del servidor: '+res.serverError(),
                                            url: '/'
                                        })
                                    } else {
                                        return res.view('vistas/Usuario/ListarUsuarios', {
                                            title: 'Listar Usuarios',
                                            usuarios: usuariosEncontrados
                                        });
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                return res.view('error',{
                    title: 'Usuarios',
                    tituloError: 'error',
                    error: 'No se envian parametros obligatorios.',
                    url: '/crearUsuario'
                })
            }
        } 
    },


    borrarUsuario: function (req, res){
        var parametros = req.allParams();
        console.log(parametros);
        if(parametros.idUsuario){
            Usuario.destroy({
                idUsuario:parametros.idUsuario
            }).exec(function(error,usuarioEliminado){
                if (error) {
                    return res.view('error',{
                        title: 'Usuarios',
                        tituloError: 'error',
                        error: 'No se ha podido eliminar el usuario. Error del servidor: '+res.serverError(),
                        url: '/usuarios'
                    })
                } else {
                    Borrachera.destroy({
                        usuBorrachera: usuarioEliminado.idUsuario
                    }).exec(function(error, borracheraEliminada){
                        if (error) {
                            return res.view('error',{
                                title: 'Borrachera',
                                tituloError: 'error',
                                error: 'No se ha podido eliminar las borracheras del usuario. Error del servidor: '+res.serverError(),
                                url: '/usuarios'
                            })
                        } else {
                            Usuario.find().exec(function(error,usuariosEncontrados){
                                if (error) {
                                    return res.view('error',{
                                        title: 'Usuarios',
                                        tituloError: 'error',
                                        error: 'No se ha podido cargar los usuarios. Error del servidor: '+res.serverError(),
                                        url: '/'
                                    })
                                } else {
                                    return res.view('vistas/Usuario/ListarUsuarios', {
                                        title: 'Usuarios',
                                        tituloError: '',
                                        usuarios: usuariosEncontrados
                                    });
                                }
                            })
                        }
                    })
                }
            });
        } else {
            return res.view('error',{
                title: 'Usuarios',
                tituloError: 'error',
                error: 'No se envian parametros obligatorios.',
                url: '/usuarios'
            })
        }
    },

    editarUsuario: function(req, res) {
        var parametros = req.allParams();
        console.log(parametros);
        if(req.method == 'POST'){
            if(parametros.idUsuario&&parametros.nombreUsuario){
                Usuario.update({
                    idUsuario:parametros.idUsuario
                },{
                    ciudadResidencia: parametros.ciudadResidencia,
                    fechaNacimiento: parametros.fechaNacimiento
                }).exec(function(error,usuarioEditado){
                    if (error) {
                        return res.view('error',{
                            title: 'Usuarios',
                            tituloError: 'error',
                            error: 'No se ha podido actualizar el usuario. Error del servidor: '+res.serverError(),
                            url: '/usuarios'
                        })
                    } else {
                        Usuario.find().exec(function(error,usuariosEncontrados){
                            if (error) {
                                return res.view('error',{
                                    title: 'Usuarios',
                                    tituloError: 'error',
                                    error: 'No se ha podido cargar los usuarios. Error del servidor: '+res.serverError(),
                                    url: '/usuarios'
                                })
                            } else {
                                return res.view('vistas/Usuario/ListarUsuarios', {
                                    title: 'usuarios',
                                    tituloError: '',
                                    usuarios: usuariosEncontrados
                                })
                            }
                        })
                    }
                })
            } else {
                return res.view('error',{
                    title: 'Usuarios',
                    tituloError: 'error',
                    error: 'No se envian parametros obligatorios.',
                    url: '/usuarios'
                })
            }
        }
    }
};

