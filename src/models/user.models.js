module.exports = (sequelize, DataType) => {
    const user = sequelize.define("user", {
        User_ID: {
            type: DataType.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        User_Name: {
            type: DataType.STRING(80),
            allowNull: false,
        },
        Role_ID: {
            type: DataType.INTEGER(11),
            defaultValue: 2,
            allowNull: false
        },
        User_User: {
            type: DataType.STRING(80),
            unique: true,
            allowNull: false,
        },
        User_Password: {
            type: DataType.STRING(100),
            allowNull: false,
        },
    },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        });

    return user;
}