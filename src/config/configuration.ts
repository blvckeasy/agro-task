import { JwtModuleOptions } from "@nestjs/jwt"
import { EventPaginationInterface } from "./interface/event-pagination.interface"
import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { join } from "path";


export default () => {

    enum EDatabaseTypes {
        postgres = "postgres",
        mysql = "mysql",
    }

    const jwtConstants = {
        secret: "its secret key"
    }
    
    const jwtConfig: JwtModuleOptions = {
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '30d' }, 
    }
    
    const defaultEventPagination: EventPaginationInterface = {
        page: 1,
        limit: 12,
    }
    
    const typeOrmModuleOptions: TypeOrmModuleOptions = {
        type: process.env.ORM_TYPE as EDatabaseTypes || "postgres",
        host: process.env.ORM_HOST || "localhost",
        port: parseInt(process.env.PORT, 10) || 5432,
        username: process.env.ORM_USERNAME || 'postgres',
        password: process.env.ORM_PASSWORD || '1029',
        database: process.env.ORM_DATABASE || 'task',
        entities: [
            join(__dirname, "..", "modules", "**", "*.entity{.ts,.js}")
        ],
        synchronize: true,
    }

    return {
        jwtConfig,
        defaultEventPagination,
        typeOrmModuleOptions,
    }
}