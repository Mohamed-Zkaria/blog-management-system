import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    imports: [],
    providers: [
        {
            provide: DataSource,
            inject: [],
            useFactory: async () => {
                try {
                    const dataSource = new DataSource({
                        type: 'postgres',
                        host: process.env.DB_HOST ?? "localhost",
                        port: parseInt(process.env.DB_PORT) ?? 5432,
                        username: process.env.DB_USERNAME ?? "postgres",
                        password: process.env.DB_PASSWORD ?? "postgres",
                        database: process.env.DB_NAME ?? "blog",
                        entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
                        synchronize: true
                    });
                    await dataSource.initialize();
                    console.log('Database connected successfully');
                    return dataSource;
                } catch (error) {
                    console.log('Error connecting to database');
                    console.log({ error })
                    throw error;
                }
            },
        },
    ],
    exports: [DataSource],
})
export class TypeOrmModule { }