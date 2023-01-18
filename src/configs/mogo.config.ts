import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService): string => {
  const login = configService.get('MONGO_LOGIN');
  const password = configService.get('MONGO_PASSWORD');
  const host = configService.get('MONGO_HOST');
  const port = configService.get('MONGO_PORT');
  const db = configService.get('MONGO_AUTHDATABASE');

  return `mongodb://${login}:${password}@${host}:${port}/${db}`;
};

const getMongoOptions = () => {
  return {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  };
};
