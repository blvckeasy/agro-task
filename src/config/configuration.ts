import { JwtModuleOptions } from "@nestjs/jwt"
import { EventPaginationInterface } from "./interface/event-pagination.interface"

export const jwtConstants = {
    secret: "its secret key"
}

export const jwtConfig: JwtModuleOptions = {
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '30d' }, 
}

export const DefaultEventPagination: EventPaginationInterface = {
    page: 1,
    limit: 10,
}