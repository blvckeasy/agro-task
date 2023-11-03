import { JwtModuleOptions } from "@nestjs/jwt"

export const jwtConstants = {
    secret: "its secret key"
}

export const jwtConfig: JwtModuleOptions = {
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '30d' }, 
}