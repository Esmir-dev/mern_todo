const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUrl:
    "mongodb+srv://esmir:Sarajevo2022!@cluster0.emnpoxg.mongodb.net/?retryWrites=true&w=majority",
};

export default config;
