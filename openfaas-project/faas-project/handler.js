'use strict'

module.exports = async (event, context) => {
  const result = {
    'body': 'perrooo: '+ JSON.stringify(event.body),
    'content-type': event.headers["content-type"]
  }

  return context
    .status(200)
    .succeed(result)
}
