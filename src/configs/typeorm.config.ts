import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const env = (process.env.NODE_ENV || 'production').replace(/\s/g, '')
const dbConfig = {
  'development': {
    username: 'root',
    password: 'root'
  },
  'production': {
    username: 'prod',
    password: 'rmuti56@1'
  }
}


export const typeOrmConfig: TypeOrmModuleOptions = {
  name: 'blog',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: dbConfig[env].username,
  password: dbConfig[env].password,
  database: 'blog',
  entities: [__dirname + '/../blog/**/*.entity.*'],
  synchronize: true
}