import { z } from "zod";

const MESSAGE = {
  required: "필수 입력 사항입니다.",
  invalidEmail: "유효한 이메일 형식이 아닙니다.",
  invalidPassword: {
    length: "비밀번호는 8자 이상 16자 이하입니다.",
    alphabet: "영문자를 1개 이상 포함해야 합니다.",
    number: "숫자를 1개 이상 포함해야 합니다.",
    special: "특수문자를 1개 이상 포함해야 합니다.",
  },
  passwordMismatch: "비밀번호가 일치하지 않습니다.",
  invalidUsername: {
    min: "유저이름은 3자 이상입니다.",
    max: "유저이름은 10자 이하입니다.",
    regex: "영문•한글•숫자•공백만 입력 가능합니다.",
  },
  invalidImage: "유효한 이미지 파일이 아닙니다.",
  invalidPhone: "유효한 연락처 형식이 아닙니다.",
  invalidDate: "유효한 날짜 형식이 아닙니다.",
  invalidInt: "정수를 입력해 주세요.",
  invalidBusinessRegistrationNumber: "사업자등록번호는 10자입니다.",
};

export const logInFormSchema = z.object({
  email: z
    .string({ required_error: MESSAGE.required })
    .email({ message: MESSAGE.invalidEmail }),
  password: z
    .string({ required_error: MESSAGE.required })
    .min(8, { message: MESSAGE.invalidPassword.length })
    .max(16, { message: MESSAGE.invalidPassword.length })
    .regex(/(?=.*[a-zA-Z])/, {
      message: MESSAGE.invalidPassword.alphabet,
    })
    .regex(/(?=.*[0-9])/, {
      message: MESSAGE.invalidPassword.number,
    })
    .regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
      message: MESSAGE.invalidPassword.special,
    }),
});

export const signUpFormSchema = z
  .object({
    email: z
      .string({ required_error: MESSAGE.required })
      .email({ message: MESSAGE.invalidEmail }),
    password: z
      .string({ required_error: MESSAGE.required })
      .min(8, { message: MESSAGE.invalidPassword.length })
      .max(16, { message: MESSAGE.invalidPassword.length })
      .regex(/(?=.*[a-zA-Z])/, {
        message: MESSAGE.invalidPassword.alphabet,
      })
      .regex(/(?=.*[0-9])/, {
        message: MESSAGE.invalidPassword.number,
      })
      .regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
        message: MESSAGE.invalidPassword.special,
      }),
    rePassword: z.string({ required_error: MESSAGE.required }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: MESSAGE.passwordMismatch,
    path: ["rePassword"],
  });

export const signUpInfoFormSchema = z.object({
  username: z
    .string({ required_error: MESSAGE.required })
    .min(3, { message: MESSAGE.invalidUsername.min })
    .max(10, { message: MESSAGE.invalidUsername.max })
    .regex(/^[a-zA-Z0-9가-힣\s]{3,10}$/, {
      message: MESSAGE.invalidUsername.regex,
    }),
  phoneNumber: z
    .string({ required_error: MESSAGE.required })
    .regex(/^\d{3}-\d{4}-\d{4}$/, { message: MESSAGE.invalidPhone }),
  profilePicture: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: MESSAGE.invalidImage,
    })
    .optional(),
  gender: z.enum(["male", "female"]).optional(),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: MESSAGE.invalidDate })
    .refine(
      (value) => {
        const parts = value.split("-");
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const day = parseInt(parts[2]);

        if (year < 1900 || year > new Date().getFullYear() - 1) {
          return false;
        }

        const dateObject = new Date(year, month, day);
        return (
          dateObject.getFullYear() === year &&
          dateObject.getMonth() === month &&
          dateObject.getDate() === day
        );
      },
      {
        message: MESSAGE.invalidDate,
      },
    )
    .optional(),
  interests: z.array(z.string()).optional(),
});

export const tutorRegisterFormSchema = z.object({
  bank: z.string().optional(),
  account: z
    .string({ required_error: MESSAGE.required })
    .refine((string) => /^-?\d+$/.test(string), {
      message: MESSAGE.invalidInt,
    }),
  businessRegistrationNumber: z
    .string()
    .refine((string) => /^-?\d+$/.test(string), {
      message: MESSAGE.invalidInt,
    })
    .refine((string) => string.length === 10, {
      message: MESSAGE.invalidBusinessRegistrationNumber,
    })
    .optional(),
  introduction: z.string().optional(),
});
