import ControllerBase from "./controllersBase";

export default class IndexController extends ControllerBase {
  async index() {
    const indexURI = this.uriGenerator.getURI(
      "IndexController_index",
      {},
      "_self"
    );

    const getBooksURI = this.uriGenerator.getURI(
      "BooksListController_getBooks"
    );

    const getBookURI = this.uriGenerator.getURI("BooksListController_getBook");

    const rateBookURI = this.uriGenerator.getURI(
      "BooksListController_rateBook"
    );

    const removeBookURI = this.uriGenerator.getURI(
      "BooksListController_removeBook"
    );
  }
}
