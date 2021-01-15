# Lynz

**Outsmarting lines, together**

![Demo Gif](https://github.com/nicholas-tao/lynz-backend/gifs/demo.gif)

[Visit Devpost Page](https://devpost.com/software/lynz)

[Demo Video](https://youtu.be/DzKA0FkMRdE)

[Frontend Repo](https://github.com/nicholas-tao/lynz-frontend)

[Hosted on Heroku](https://lynz-backend.herokuapp.com/)

## Inspiration

To flatten the COVID-19 curve, we're all doing our best to minimize social interactions. If possible, we've even barricaded ourselves moat and drawbridge at home hoping to wait this storm out. Even so, there is one necessity that nobody can wait out forever: grocery shopping.

Trying to socially distance and shop at the same time… Lengthy checkout lines and crowded supermarkets... Having to run a 3 hour errand at Walmart just for weekly groceries...

These challenges paired with the current global situation have led us to develop Lynz, an easy to use webapp that allows people to find out how busy any particular supermarket is based on live data provided by other shoppers. The hope is that by spreading accurate and actionable information, we can shop smarter and safer.

## What it does

Users can view the busyness levels of nearby grocery stores. The busyness level is calculated using data from other users who reported the busyness level of the given store when they visited it. By providing this data to users, they can make informed decisions of when and where to go grocery shopping.

## How we built it

This project was built using the MERN stack. On the front end, the React library was essential to design the UI and UX. When called upon, location data taken directly from Google Maps API enables Lynz to figure out a user’s current location and display all supermarkets within a given radius. The backend is built with Node.js and Express. The backend server sends busyness information from a MongoDB database to the user and also relays busyness reports from the user to store in the database.

To ensure that the busyness shown to users is accurate, we used a regression model based on exponentially moving averages. This means that database entries are depreciated based on the time elapsed, giving exponentially greater weights to more recent busyness entries. Our algorithm is geared to work in real-life situations based on the assumption of mass scale. This means that sufficient data is required before an accurate busyness is displayed to users.

## Challenges we ran into

Working with new technologies including MongoDB, Express, React, Node.js, and integrating them together has been challenging. Being stuck at our homes, it has also been difficult coordinating with one another effectively. We also had difficulty deploying our webapp.

## Accomplishments that we're proud of

Prior to Silicon Valley Hacks, our team had no experience working with the MERN stack. We did, however, decide that if we were to build something together, it would promote change through connecting communities in the midst of the global pandemic. Bouncing off one anothers' prior skills, strengths, and interests, we learned the MERN stack to build Lynz. Each one of us can resolutely say that "yes, this was a challenging experience and it has also been worth the while".

## What we learned

We learned all about the MERN stack and how to effectively collaborate with each other despite being in our own homes.

## What's next for Lynz

Moving past our hackathon project, we plan to spread awareness and engage people around local communities to use Lynz. With more users, the busyness level data will more more accurate and benefit everyone. We would also work on steps to build a mobile version of our platform to enable users to receive notifications on selected stores and streamline both convenience and accessibility.
