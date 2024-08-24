const required_env_vars = [
  "ETHEREUM_NETWORK",
  "INFURA_API_KEY",
  "SIGNER_PRIVATE_KEY",
];

export function verify_env_vars() {
  for (const env_var of required_env_vars) {
    if (!process.env[env_var]) {
      throw new Error(`Missing required environment variable: ${env_var}`);
    }
  }
}

