Server listening on port 3000
Socket Connection Initialized
info: sending message from 12018993151 to 15599172950 with message testing 1 2
info: Request: { host: 'rest.nexmo.com',
  port: 443,
  path: '/sms/json?type=unicode&from=12018993151&to=15599172950&text=testing%201%202&api_key=6bac77ba&api_secret=bWbEl1bVCMJFEf8L',
  method: 'POST',
  headers:
   { 'Content-Type': 'application/x-www-form-urlencoded',
     Accept: 'application/json',
     'User-Agent': 'nexmo-node/2.2.1 node/8.11.1' } }
Body: undefined
info: response ended: 200
{ 'message-count': '1',
  messages:
   [ { to: '15599172950',
       'message-id': '0B000000DB6C6D8D',
       status: '0',
       'remaining-balance': '1.96010000',
       'message-price': '0.00570000',
       network: '310090' } ] }
Success
{ messageId: '0B000000DB6C8683',
  from: '15599172950',
  text: 'Alex sucks',
  type: 'text',
  timestamp: '2018-05-18 22:27:41' }