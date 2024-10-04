import { ResourcesConfig } from "aws-amplify";

export const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_7np4XcTfB",
      userPoolClientId: "mtdbn1vfd82dbuf73laia54c4",
      identityPoolId: "us-east-1:2ac5a5b6-77ed-46ef-bbd5-95a63cd5b7a5",
      allowGuestAccess: true,
      signUpVerificationMethod: "code",
    },
  },
};
