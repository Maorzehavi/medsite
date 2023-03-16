class Config{}

class DevConfig extends Config{
    public readonly apiBaseUrl = 'http://localhost:3005';
}

class ProdConfig extends Config{
    public readonly apiBaseUrl = 'https://my-production-api.com';
}

const appConfig = process.env.NODE_ENV === 'production' ? new ProdConfig() : new DevConfig();

export default appConfig;