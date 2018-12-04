export interface SignInData {
  email:    string;
  password: string;
}

export interface AuthData {
  accessToken:  string;
  client:       string;
  expiry:       string;
  tokenType:    string;
  uid:          string;
}

export interface RegisterData {
  email:    string;
  password: string;
  name:     string;
  language: string;
}

export interface FacebookLoginData {
  email:  string;
  name:   string;
  uid:    string;
}

export interface GoogleLoginData {
  email:  string;
  name:   string;
  uid:    string;
}