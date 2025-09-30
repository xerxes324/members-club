# Members Lounge

A simple Node.js/Express app with user authentication and member/admin access.

## Live link : https://members-lounge-2.onrender.com/ 

## Tech Stack

- Node.js, Express, EJS  
- PostgreSQL  
- Passport.js for auth  
- bcryptjs for password hashing  

## Setup

1. Clone the repo:
git clone <repo-url>
cd members-lounge

2. Install dependencies:
npm install

3. Configure database in `db/pool.js` (PostgreSQL) and create necessary tables (`users`, `messages`, `secretcodes`).

4. Run the app:
npm start

5. Visit http://localhost:3000
