type ValidateType = 'email' | 'password' | 'number';

type TypeConfig = {
  [key in ValidateType]: {
    regex: RegExp;
    message: string;
  };
};

const types: TypeConfig = {
//   email: {
//     regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     message: 'Preencha um email válido',
//   },
//   password: {
//     regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
//     message:
//       'A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 dígito, com no mínimo 8 caracteres.',
//   },
 email: {
    regex: /\S+@\S+\.\S+/,
    message: 'Preencha um email válido',
  },
  password: {
    regex: /^.{6,}$/,
    message: 'A senha precisa ter no mínimo 6 caracteres.',
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize números apenas.',
  },
};

export function validate(type: ValidateType, value: string): { valid: boolean; message?: string } {
  const validation = types[type];

  if (!validation) {
    console.warn(`Tipo de validação não encontrado: ${type}`);
    return { valid: true };
  }

  const isValid = validation.regex.test(value);
  return isValid ? { valid: true } : { valid: false, message: validation.message };
}
