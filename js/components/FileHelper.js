export class FileHelper {
  readStringFromFileAtPath = function (path) {
    const request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    const returnValue = request.responseText;

    return returnValue;
  };
}
