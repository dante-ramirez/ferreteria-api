export default {
  service: 'API',
  environment: process.env.APP_ENVIRONMENT || 'develop',
  webAppBaseUrl: process.env.WEB_APP_BASE_URL || 'http://localhost:3000',
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:9000',
  adminWebAppBaseUrl: process.env.ADMIN_WEB_APP_BASE_URL || 'http://localhost:3001',
  // apiBaseUrlMercadoPago: process.env.API_BASE_URL_MERCADO_PAGO || 'https://api.mercadopago.com',
  api: {
    port: Number(process.env.API_PORT) || 9000,
    host: process.env.API_HOST || 'localhost'
  },
  database: {
    port: process.env.DATABASE_PORT || 5432,
    host: process.env.DATABASE_HOST || 'localhost',
    name: process.env.DATABASE_NAME || 'ferreteria',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || '12345'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    algorithm: process.env.JWT_ALGORITHM || 'HS512',
    durationInMinutes: Number(process.env.JWT_DURATION_IN_MINUTES) || 240
  },
  mailing: {
    driver: process.env.MAILING_DRIVER || 'console',
    senderAccount: process.env.MAILING_SENDER_ACCOUNT || 'sender@gmail.com',
    smtpHost: process.env.MAILING_SMTP_HOST || 'smtp.gmail.com',
    smtpPort: Number(process.env.MAILING_SMTP_PORT) || 465,
    smtpUser: process.env.MAILING_SMTP_USER || '',
    smtpPassword: process.env.MAILING_SMTP_PASSWORD || ''
  }
  // payment: {
  //   driver: process.env.PAYMENT_DRIVER || 'memory',
  //   accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || ''
  // }
};
