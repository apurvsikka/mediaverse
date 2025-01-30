import { IExtension, ISearchResults } from "../../lib";

abstract class BaseParser {
  // information on the extention
  protected abstract about: IExtension;
}

export default BaseParser;
