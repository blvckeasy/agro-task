import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { EventModule } from './modules/event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src', 'schema.gql'),
    }),
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configuration().typeOrmModuleOptions),
    JwtModule.register(configuration().jwtConfig),
    EventModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}