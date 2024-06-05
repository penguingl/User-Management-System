import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

interface HistoryAttributes {
    id: string,
    userId: string,
    action: string,
    timestamp: Date,
};

interface HistoryCreationAttributes extends Optional<HistoryAttributes, 'id'> {};

class History extends Model<HistoryAttributes, HistoryCreationAttributes> implements HistoryAttributes {
    public id!: string;
    public userId!: string;
    public action!: string;
    public timestamp!: Date;
};

History.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'History',
    timestamps: false,
});

export default History;