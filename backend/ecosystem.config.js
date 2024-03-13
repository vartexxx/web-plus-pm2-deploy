require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_FOLDER,
  DEPLOY_REF,
} = process.env;

module.exports = {
  apps: [{
    name: 'api-mesto',
    script: './dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:vartexxx/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend`,
      'post-deploy': `cd ~${DEPLOY_FOLDER}/source/backend && npm i && npm run build && pm2 restart ecosystem.config.js`,
    },
  },
};
