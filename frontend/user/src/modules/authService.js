import { 
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    SignUpCommand,
    ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import config from "../../cognito_config.json";

// Cognito Identity Provider Clientを作成
export const cognitoClient = new CognitoIdentityProviderClient({
    region: config.region
})

// SignIn処理の実装
export const signIn = async (username, password) => {
    // signIn時のパラメータを定義
    const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: config.clientId,
        AuthParameters: {
            USERNAME : username,
            PASSWORD : password,
        },
    };
    try {
        // 設定値を読み込んでcommandを作成
        const command = new InitiateAuthCommand(params);
        // commandをinputに認証リクエストを実施
        const { AuthenticationResult } = await cognitoClient.send(command);
        console.log("AuthenticationResult");
        console.log(AuthenticationResult)
        // 認証リクエストの結果がnullでない場合
        if (AuthenticationResult) {
            // sessionStorageに各種tokenを保存
            sessionStorage.setItem("idToken", AuthenticationResult.IdToken || "");
            sessionStorage.setItem(
                "accessToken",
                AuthenticationResult.AccessToken || "",
            );
            sessionStorage.setItem(
                "refreshToken",
                AuthenticationResult.RefreshToken || "",
            );
            return AuthenticationResult;
        } 
    } catch (error) {
        console.error("Error signing in: ", error);
        throw error;
    }
};

// signUp処理を実装
export const signUp = async (email, password) => {
    // パラメータを定義
    const params = {
      ClientId: config.clientId,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
      ],
    };
    try {
      // パラメータをインプットにSignUpCommandを生成
      const command = new SignUpCommand(params);
      // SignUpCommandをインプットに、SignUpリクエストを実行
      const response = await cognitoClient.send(command);
      console.log("Sign up success: ", response);
      return response;
    } catch (error) {
      console.error("Error signing up: ", error);
      throw error;
    }
  };
  
  // SignUp時のコード認証処理を実装
  export const confirmSignUp = async (username, code) => {
    // parameterを定義
    const params = {
      ClientId: config.clientId,
      Username: username,
      ConfirmationCode: code,
    };
    try {
      // ConfirmSignUpCommandを生成
      const command = new ConfirmSignUpCommand(params);
      // ConfirmSignUpCommandをinputに、ConfirmSignUpリクエストを実行
      await cognitoClient.send(command);
      console.log("User confirmed successfully");
      return true;
    } catch (error) {
      console.error("Error confirming sign up: ", error);
      throw error;
    }
  };

