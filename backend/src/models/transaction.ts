import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'

interface TransactionAttributes {
  id: number
  user_id: number
  category: string
  amount: number
  date: Date
  description?: string
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> {}

export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: number
  public user_id!: number
  public category!: string
  public amount!: number
  public date!: Date
  public description?: string
}

Transaction.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    description: { type: DataTypes.STRING },
  },
  { sequelize, tableName: 'transactions', timestamps: true }
)

