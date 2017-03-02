/**
 * Borrachera.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      
      idBorrachera:{
          type: 'integer',
          autoIncrement: true,
          unique: true
      },
      
      motivo:{
          type: 'string',
          required: true,
          size: 30
      },
      
      latitudDondeEmpezo:{
          type: 'integer',
          defaultsTo: 0
      },
      
      longitudDondeEmpezo: {
          type: 'integer',
          defaultsTo: 0
      },
      
      usuBorrachera:{
          model: 'Usuario'
      }

  }
};

