module.exports = {
  cmd: 'sass',
  name: 'Sass',
  args: ['{FILE_ACTIVE}', '{FILE_ACTIVE_PATH}/{FILE_ACTIVE_NAME_BASE}.css'],
  functionMatch: function (output) {
    const errorRg = /^Error: .*$/;
    const fileRg = /^  ([^\s]+) (\d+):(\d+)/;
    // this is the list of error matches that atom-build will process
    const errors = [];
    let message = 'no message';
    output.split(/\r?\n/).forEach(line => {
      const err_match = errorRg.exec(line);
      if (err_match) {
        message = err_match[0];
      } else {
        // process possible error messages
        const file_match = fileRg.exec(line);
        if (file_match) {
          // map the regex match to the error object that atom-build expects
          errors.push({
            message,
            file: file_match[1],
            line: file_match[2],
            col: file_match[3]
          });
        }
      }
    });
    return errors;
  }
};
