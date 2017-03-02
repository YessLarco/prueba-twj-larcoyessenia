/**
 * Usuario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      
      idUsuario:{
          type: 'integer',
          autoIncrement: true,
          unique: true
      },
      
      nombreUsuario:{
          type: 'string',
          required: true
      },
      
      ciudadResidencia:{
          type:'string',
          defaultsTo: 'Quito'
      },
      
      fechaNacimiento:{
          type:'date', 
          required: true
      },
      
      UsuariosBorracheras: {
          collection: 'Borrachera',
          via: 'usuBorrachera'
      }

  }
};

