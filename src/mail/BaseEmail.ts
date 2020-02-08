export default class BaseEmail {
  constructor(public to: string, public subject: string, public text: string) {}
}
