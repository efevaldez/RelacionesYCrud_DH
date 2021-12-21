const moviesController = require("../../controllers/moviesController");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,  
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        releaseDate: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        length: dataTypes.BIGINT(10),
        genreId: dataTypes.BIGINT(10)
    };
    let config = {
        timestamps: true,
        deletedAt: false
    }
    const Movie = sequelize.define(alias,cols,config);

    Movie.associate = models => {
        Movie.belongsTo(models.Genre, {
            as: 'genre',
            foreignKey: 'genreId'
        });
    };

    Movie.associate = models => {
        Movie.belongsToMany(models.Actor, {
            as: 'actors',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
            /* onDelete: 'CASCADE' */
        });
    };

    return Movie
};