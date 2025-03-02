/** @type {import('next-sitemap').IConfig} */
const inDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  siteUrl: inDevelopment ? 'http://localhost:3000' : 'https://dospolov.com',
};
