import ControllerBase from "./controllersBase";

export default class BooksListController extends ControllerBase {
  async getBooks() {
    try {
      const books = [{ _id: 0 }, { _id: 1 }, { _id: 2 }];
      const resources = await Promise.all(
        books.map(async () => {
          const model = { getResource(g: unknown) {} }; // TODO model
          const resource = await model.getResource(this.uriGenerator);
          return resource;
        })
      );

      this.ok(resources);
    } catch (err) {
      this.error(err);
    }
  }

  async getBook() {
    const { id } = this.params;

    try {
      const bookModel = { getResource(x: any) {} }; //new BookModel({ _id: id });
      const resource = await bookModel.getResource(this.uriGenerator);
      this.ok(resource);
    } catch (err) {
      this.error(err);
    }
  }

  async rateBook() {
    const { id } = this.params;
    const { rating } = this.body;

    try {
      const bookModel = { getResource(x: any) {} }; //new BookModel({ _id: id, rating });
      const resource = await bookModel.getResource(this.uriGenerator);
      this.ok(resource);
    } catch (err) {
      this.error(err);
    }
  }

  async removeBook() {
    try {
      this.noContent();
    } catch (err) {
      this.error(err);
    }
  }
}
