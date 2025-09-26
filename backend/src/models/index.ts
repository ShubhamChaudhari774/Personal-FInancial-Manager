import { Sequelize } from 'sequelize'
import path from 'path'

const dialect = (process.env.DB_DIALECT || 'mysql') as 'mysql' | 'sqlite'

export const sequelize =
  dialect === 'sqlite'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: path.join(process.cwd(), 'dev.sqlite'),
        logging: false,
      })
    : new Sequelize(
        process.env.DB_NAME || 'finance_db',
        process.env.DB_USER || 'finance_user',
        process.env.DB_PASSWORD || 'finance_pass',
        {
          host: process.env.DB_HOST || 'localhost',
          port: Number(process.env.DB_PORT || 3306),
          dialect: 'mysql',
          logging: false,
        }
      )

export { User } from './user'
export { Transaction } from './transaction'
export { Category } from './category'
export { SavingsRecommendation } from './savingsRecommendation'

