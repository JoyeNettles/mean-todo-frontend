export default class ToDo {
  _id: string;
  title: string;
  description: string;
  date: Date;
  status: string;

  constructor(title: string = '',
              description: string = '',
              date: Date = new Date(),
              status: string = '') {
    this.title = title;
    this.description = description;
    this.date = date;
    this.status = status;
  }

  static createFromArray(responses: any): Array<ToDo> {
    const responses = responses.data.docs;
    return responses.map((response) => {
      return ToDo.createFromResponse(response);
    });
  }

  private static createFromResponse(response: any) {
    return new ToDo(response['title'],
      response['description'],
      response['date'],
      response['status']);
  }
}

