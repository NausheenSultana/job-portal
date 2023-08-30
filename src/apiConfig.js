import merge from "lodash/merge";

const commonConfig = {
  appName: "Marketing Portal",
  auth: {
    authorizationPath: "/auth/oauth/v2/authorize",
    logoutPath: "/login/responses/logoff.html",
    popupOptions: { width: 482, height: 680 },
    redirectUrl: `${window.location.origin}`,
    responseType: "token id_token",
    scope: ["openid profile"],
    storageType: "localStorage",
    tokenType: "Bearer",
  },
};
// const commonConfig = {
//     auth: {
//       authorizationUrl:
//         'https://oauth.iam.perf.target.com/auth/oauth/v2/authorize',
//       logoutUrl:
//         'https://logonservices.iam.perf.target.com/login/responses/logoff.html',
//     },
//   }
const envConfigs = {
  development: {
    apiURL: "https://marketinghub.target.com/api/",
    imageURL: "https://marketinghub.target.com/",
    auth: {
      host: "https://oauth.iam.perf.target.com",
      logoutHost: "https://logonservices.iam.perf.target.com",
      clientId: "mkt_recognition_npe_im",
      nonce: "1234",
    },
  },
  stage: {
    apiURL: "http://marketinghub-stage.target.com:4000/api/",
    imageURL: "http://marketinghub-stage.target.com:4000/",
    auth: {
      host: "https://oauth.iam.perf.target.com",
      logoutHost: "https://logonservices.iam.perf.target.com",
      clientId: "mkt_recognition_npe_im",
      nonce: "1234",
    },
  },
  production: {
    apiURL: "https://marketinghub.target.com/api/",
    imageURL: "https://marketinghub.target.com/",
    auth: {
      host: "https://oauth.iam.target.com",
      logoutHost: "https://logonservices.iam.target.com",
      clientId: "mkt_recognition_prod_im",
      nonce: "1234",
    },
  },
};

// env.js sets APP_ENV
const appEnv = "development"; //process.env.NODE_ENV;
const config = envConfigs[appEnv];
const apiConfig = merge(commonConfig, config);

export default apiConfig;
