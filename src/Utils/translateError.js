const translateError = (message) => {
  const translation = {
    "auth/invalid-email": "Email inválido",
    "auth/user-disabled": "Usuário desabilitado",
    "auth/user-not-found": "Usuário não cadastrado",
    "auth/wrong-password": "Senha incorreta",
    "auth/weak-password": "A senha deve possuir no mínimo 6 caracteres",
    "auth/email-already-exists": "O e-mail informado já está em uso",
    "auth/operation-not-allowed": "Conta não ativada",
    default:
      "Não foi possível completar essa ação. Tente novamente mais tarde.",
  };
  let text = "";
  translation[message]
    ? (text = translation[message])
    : (text = translation["default"]);
  return text;
}

export default translateError