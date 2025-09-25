import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'

interface SavingsRecommendationAttributes {
  id: number
  user_id: number
  category: string
  suggestion: string
  estimated_savings: number
}

interface SavingsRecommendationCreationAttributes extends Optional<SavingsRecommendationAttributes, 'id'> {}

export class SavingsRecommendation extends Model<SavingsRecommendationAttributes, SavingsRecommendationCreationAttributes> implements SavingsRecommendationAttributes {
  public id!: number
  public user_id!: number
  public category!: string
  public suggestion!: string
  public estimated_savings!: number
}

SavingsRecommendation.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    suggestion: { type: DataTypes.TEXT, allowNull: false },
    estimated_savings: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, tableName: 'savings_recommendations', timestamps: true }
)

