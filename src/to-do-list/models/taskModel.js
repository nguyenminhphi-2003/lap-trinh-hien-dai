export default (sequelize, DataTypes) => {
    const Task = sequelize.define(
      'Task',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        detail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('ongoing', 'completed'),
          allowNull: false,
          defaultValue: 'ongoing',
        },
      },
      {
        defaultScope: {
          attributes: { exclude: ['user_id'] },
        },
      },
    );
  
    Task.associate = (models) => {
      Task.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    };
  
    return Task;
  };
  