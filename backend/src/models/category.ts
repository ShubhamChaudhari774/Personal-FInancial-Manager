import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'

interface CategoryAttributes {
  id: number
  name: string
  type: 'fixed' | 'variable' | 'discretionary'
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: number
  public name!: string
  public type!: 'fixed' | 'variable' | 'discretionary'
}

Category.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    type: { type: DataTypes.ENUM('fixed', 'variable', 'discretionary'), allowNull: false },
  },
  { sequelize, tableName: 'categories', timestamps: true }
)

