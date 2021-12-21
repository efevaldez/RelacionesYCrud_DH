module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        firstName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3,1),
            allowNull: false
        },
        favoriteMovieId: dataTypes.BIGINT(10).UNSIGNED
    };
    let config = {
        timestamps: true,
        deletedAt: false
    }
    const Actor = sequelize.define(alias, cols, config); 

    Actor.associate = models => {
        Actor.belongsToMany(models.Movie, {
            as: 'Movies',
            through: 'actor_movie',
            foreignKey: 'actor_id',
            otherKey: 'movie_id',
            timestamps: false
        });
    };

    return Actor
};