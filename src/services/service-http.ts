export enum HTTP_REQUEST_RESULT {
  OK,
  STATUS,
  TIMEOUT,
  WRONG_MIME,
  FAILURE,
  ABORTED
}
const _abortCallbacks: Function[] = [];

function _unsetAbortCallback(abortrIndex: number) {
  _abortCallbacks.splice(abortrIndex);
}
export function abortAll() {
  _abortCallbacks.forEach((_, i, arr) => {
    arr.splice(i);
    _();
  });
}
export function xmlRequest(url: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const abortrIndex = _abortCallbacks.length;
    _abortCallbacks.push(xhr.abort);
    xhr.open('GET', url);
    xhr.ontimeout = () => {
      _unsetAbortCallback(abortrIndex);
      reject({status: HTTP_REQUEST_RESULT.TIMEOUT})
    }
    xhr.onerror = () => {
      _unsetAbortCallback(abortrIndex);
      reject({status: HTTP_REQUEST_RESULT.FAILURE})
    };
    xhr.onabort = () => {
      reject({status: HTTP_REQUEST_RESULT.ABORTED})
    };
    xhr.withCredentials = false;
    xhr.responseType= 'document';
    xhr.overrideMimeType('text/html');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== xhr.DONE) return;
      if (xhr.status === 200) {
        if (!xhr.responseXML) {
          // incorrect MIME
          reject({status: HTTP_REQUEST_RESULT.WRONG_MIME})
        } else {
          /* success processing here */
          resolve({status: HTTP_REQUEST_RESULT.OK, response: xhr.responseXML})
        }
      } else {
        // STATUS
        reject({status: HTTP_REQUEST_RESULT.STATUS, code: xhr.status.toString()})
      }
      _unsetAbortCallback(abortrIndex);
    }
    xhr.send();
  });
}
