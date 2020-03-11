# Routing Notes

## REST vs Non REST

| Non REST         | REST                    | Action    |
| :--------------- | :---------------------- | :-------- |
| /listAllLessons  | /api/lessons            | GET       |
| /createLesson    | /api/lessons            | POST      |
| /deleteLesson    | /api/lessons/{id}       | DELETE    |
| /updateUser      | /api/users/{id}         | PATCH/PUT |
| /listHubMessages | /api/hubs/{id}/messages | GET       |
| /viewMessage     | /api/messages/{id}      | GET       |

## Menu

- CommonJS modules (require/export).
- Express Router (break up a server into sub component).
- Different ways to read data from the client.
  - body --> req.body
  - query string --> req.query
  - URL parameter ---> req.params
  -
- using sub-routes

## Requirements

- list all hubs
- add a hub
- update a hub
- remove a hub
- view hub messages
- post a message to a hub

## Data Access

- use `hubs-model.js` to talk to the database
  - find(query)
  - findById(id)
  - add(hub)
  - remove(id)
  - update(id, changes)
  - findHubMessages(hubId)
  - findMessageById(messageId)
  - addMessage(message)

**Everyone of those methods returns a promise**

## Basic Application Architecture

- UI layer/code.
- Business Logic layer/code.
- Database layer/code.

## Using Query String Parameters

https://www.google.com/search?source=hp&ei=I9FnXuqmIumj_Qafh4HwAg&q=mdn+query+string+parameters

https://www.google.com
/search
? ----> marks the beginning of the query string
source=hp ----> key/value pair
& ----> separates key/value pairs
ei = I9FnXuqmIumj_Qafh4HwAg
&
q=mdn+query+string+parameters

Express will parse the query string into an object

```js
req.query = {
  source: hp,
  ei: I9FnXuqmIumj_Qafh4HwAg,
  q: mdn + query + string + parameters,
};
```
