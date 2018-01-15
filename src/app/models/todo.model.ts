export default class ToDo {
  _id: string;
  title: string;
  description: string;
  date: string;
  status: string;

  constructor(title: string = '',
              description: string = '',
              date: string = '',
              status: string = '') {
    this.title = title;
    this.description = description;
    this.date = date;
    this.status = status;
  }

  static createFromArray(responseBody: any): Array<ToDo> {
    const responses = responseBody.data.docs;
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

