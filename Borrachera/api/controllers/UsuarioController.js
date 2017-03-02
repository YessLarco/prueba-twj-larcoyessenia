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
            if(parametros.nombreUsuario && parametros.fechaNacimiento ){

                if (parametros.ciudadResidencia == '')
                    delete parametros.ciudadResidencia

                    ms = Date.parse(parametros.fechaNacimiento);
                fecha = new Date(ms);

                Usuario.findOne({
                    nombreUsuario: parametros.nombreUsuario
                }).exec(function(error,usuarioEncontrado){
                    if(usuarioEncontrado){
                        console.log("El usuario ya esta registrado")
                        //                        return res.view('error',{
                        //                            title: 'profesores',
                        //                            tituloError: 'error',
                        //                            error: 'El profesor ya esta registrado',
                        //                            url: '/crearProf'
                        //                        })
                    }else{

                        Usuario.create({

                            nombreUsuario: parametros.nombreUsuario,
                            ciudadResidencia: parametros.ciudadResidencia,
                            fechaNacimiento: parametros.fechaNacimiento

                        }).exec(function (error, usuarioCreado){

                            if (error) { return res.serverError(); }

                            sails.log.info(usuarioCreado);
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
                        })

                    }

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
                if (error) return res.serverError()
                Borrachera.destroy({
                    usuBorrachera: usuarioEliminado.idUsuario
                }).exec(function(error, borracheraEliminada){
                    Usuario.find().exec(function(error,usuariosEncontrados){
                        if(error) return res.serverError();
                        return res.view('vistas/Usuario/ListarUsuarios', {
                            title: 'usuarios',
                            tituloError: '',
                            usuarios: usuariosEncontrados
                        });
                    })
                })
            });
        }else{
            return res.badRequest('No envia todos los parametros');
        }
    },

    editarUsuario: function(req, res) {
        var parametros = req.allParams();
        console.log(parametros);
        if(req.method == 'POST'){
            if(parametros.idUsuario&&parametros.nombreUsuario){
                Usuario.findOne({
                    nombreUsuario: parametros.nombreUsuario
                }).exec(function(error,usuarioEncontrado){
                    if(usuarioEncontrado){
                        return res.view('error',{
                            title: 'usuarios',
                            tituloError: 'error',
                            error: 'EL usuario ya existe',
                            url: '/usuarios'
                        })
                    }else{
                        Usuario.update({
                            idUsuario:parametros.idUsuario
                        },{
                            correoProf: parametros.correoProf
                        }).exec(function(error,profesorEditado){
                            if (error) { return res.serverError(); }
                            Profesor.find().exec(function(error,profesoresEncontrados){
                                if(error) return res.serverError();
                                return res.view('FormularioProfesores/Profesores', {
                                    title: 'profesores',
                                    tituloError: '',
                                    profesores: profesoresEncontrados
                                });
                            })
                        })
                    }
                })
            }
        }
    };

