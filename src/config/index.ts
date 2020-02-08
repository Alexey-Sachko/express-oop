const { env } = process;

const config = {
  email: {
    address: "resnicyekb@yandex.ru",
    password: "ksushaSokol1998"
  },
  token: {
    secret: env.JWT_SECRET || "exampleSecret"
  }
};

export default config;
