## GET /notifications?tripId=[tripId]

**Return a list of all the notifications for a specific trip in the database**

GET request to '/notifications' returns a list of all the notifications for a specific [tripId] in the database. The list contains notifications objects with the notifications's id, type, contentId, and content. There is a timestamp for when the notification was created in the database and a timestamp for the last time it was updated.

Example:

```
request.get('travel-by-egt.herokuapp.com/notifications?tripId=2');

//response

[
  {
    "id":1,
    "tripId":2,
    "type":"expense",
    "contentId":6,
    "createdAt":"2017-10-11T23:55:36.000Z",
    "updatedAt":"2017-10-11T23:55:36.000Z",
    "content":
      {
        "id":6,
        "amount":60,
        "description":"12345",
        "userId":3,
        "tripId":2,
        "createdAt":"2017-10-11T23:55:36.000Z",
        "updatedAt":"2017-10-11T23:55:36.000Z",
        "UserId":3,
        "TripId":2
      }
  },
  {
    "id":2,
    "tripId":2,
    "type":"expense",
    "contentId":7,
    "createdAt":"2017-10-12T00:02:35.000Z",
    "updatedAt":"2017-10-12T00:02:35.000Z",
    "content":
      {
        "id":7,
        "amount":60,
        "description":"12345",
        "userId":3,
        "tripId":2,
        "createdAt":"2017-10-12T00:02:35.000Z",
        "updatedAt":"2017-10-12T00:02:35.000Z",
        "UserId":3,
        "TripId":2
      }
  }
]

```