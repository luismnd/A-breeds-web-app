const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'dog', 
    { id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
      name: {type: DataTypes.STRING, allowNull: false},
      dBTag: {type: DataTypes.BOOLEAN, defaultValue: true},

      weight: {type: DataTypes.STRING},
      height: {type: DataTypes.STRING},

      life_span: {type: DataTypes.INTEGER},

      temperament: {type: DataTypes.ARRAY(DataTypes.TEXT)}, //Este string es una lista de palabras separadas por comas, se puede separar para hacer filtros mas precisos
      image: {type: DataTypes.STRING},       //Al conectar con esta tabla hay que destructurar el objeto
    },
    { timestamps: false }
  );
};
