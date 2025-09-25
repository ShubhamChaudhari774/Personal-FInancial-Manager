import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'

interface UserAttributes {
  id: number
  name: string
  email: string
  password_hash: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public name!: string
  public email!: string
  public password_hash!: string
}

User.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: 'users', timestamps: true }
)

