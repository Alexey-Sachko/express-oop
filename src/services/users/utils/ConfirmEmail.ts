import BaseEmail from "../../../mail/BaseEmail";

const getTemplate = (userId: number | string, permUid: string) => {
  return `Ссылка для подтверждения email: http://localhost:3000/api/v1/users/${userId}/confirm/${permUid}`;
};

export default class ConfirmEmail extends BaseEmail {
  constructor(to: string, userId: string | number, permUid: string) {
    super(
      to,
      'Потдверждение регистрации: Сервис "Тележка"',
      getTemplate(userId, permUid)
    );
  }
}
