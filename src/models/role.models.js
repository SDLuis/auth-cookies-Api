module.exports = (sequalize, DataType) => {
    const role = sequalize.define("role", {
        Role_ID: {
            type: DataType.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        Role: {
            type: DataType.STRING(80),
            unique: true,
            allowNull: false,
        },
    },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    );
    return role;
};