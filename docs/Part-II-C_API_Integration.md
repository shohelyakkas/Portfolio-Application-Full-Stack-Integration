## Part II (c) — Integrate Backend APIs to the Frontend (API consumption)

This document section is ready to paste into your assignment report. It shows which files to cite, concise code snippets you can copy, cURL/Postman examples, run steps, and recommended screenshots with captions.

**Purpose**
- Show that the frontend consumes backend REST APIs (signin, signout, signup, profile, projects, qualifications, contacts, users).
- Demonstrate protected routes using JWT and that the frontend includes the token on requests.

---

**Files to reference (paste short excerpts in the report)**
- Frontend (examples):
  - `client/components/Signin.jsx` — POST `/auth/signin` (login request).
  - `client/src/auth.js` — signout and token helpers.
  - `client/src/project.jsx` — GET/POST/PUT/DELETE `/api/projects`.
  - `client/src/projectDetail.jsx` — GET `/api/projects/:id`.
  - `client/src/contact.jsx` — GET/POST `/api/contacts`.
  - `client/src/qualification.jsx` — GET/POST/DELETE `/api/qualifications`.
  - `client/components/Signup.jsx` — POST `/api/users` (register).
  - `client/components/Profile.jsx` — GET/PUT `/api/users/:id`.
  - `client/components/Users.jsx` — (admin) GET/DELETE `/api/users`.

- Backend (examples):
  - `server/controllers/auth.controller.js` — `signin` and `signout` logic (JWT creation and response).
  - `server/routes/auth.routes.js` — route definitions for signin/signout.
  - `server/middlewares/auth.js` (or equivalent) — `requireSignin` jwt verification.
  - `server/models/user.model.js` — password hashing (`virtual('password')` or pre-save) and `comparePassword()`.

---

**Concise code snippets to paste (keep these short in the report)**

- Frontend: Signin request (from `Signin.jsx`)
```
const res = await fetch('http://localhost:3000/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const data = await res.json(); // contains token + user
```

- Frontend: include JWT on protected requests
```
const token = JSON.parse(localStorage.getItem('jwt')).token;
await fetch('http://localhost:3000/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(projectData)
});
```

- Backend: `signin` controller (key lines)
```
const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '7d' });
res.json({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
```

- Backend: `requireSignin` middleware (key lines)
```
const token = (req.headers.authorization || '').split(' ')[1];
const decoded = jwt.verify(token, config.jwtSecret);
req.auth = decoded; // { _id, role, iat, exp }
```

---

**Exact Postman / cURL examples to include**

- Sign-in (cURL):
```
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"shohelyon@gmail.com","password":"On@045161306"}'
```

- Protected GET with token:
```
curl http://localhost:3000/api/users \
  -H "Authorization: Bearer <TOKEN>"
```

- Signout:
```
curl http://localhost:3000/auth/signout
```

Include the request JSON and the response JSON (Postman screenshot) exactly as shown when you tested.

---

**Run & test steps for reproducing**
```
# start backend (project root)
node server.js

# start frontend (new terminal)
cd client
npm install
npm run dev
```
Then run the cURL/Postman requests or use the UI to sign in and perform protected actions.

---

**Screenshots to capture and captions to include**
- Screenshot 1: `POST /auth/signin` (Postman) — highlight request body and response JSON containing `token` and `user`. Caption: "POST /auth/signin — returns JWT and user info".
- Screenshot 2: `GET /auth/signout` (Postman) — show `{"message":"Signed out successfully"}`. Caption: "GET /auth/signout — signout confirmation".
- Screenshot 3: Protected route without token (Postman) — show `401 Unauthorized`. Caption: "Protected route returns 401 when no token provided".
- Screenshot 4: Protected route with token (Postman) — show 200 OK and response. Caption: "Protected route succeeds with valid JWT".
- Screenshot 5: Frontend UI (Signin → perform action) — show that the UI triggers API (e.g., admin creates project) and result appears in UI. Caption: "Frontend consumes backend API; created item visible in UI".
- Screenshot 6: Any API error/validation (e.g., contact message too long) — show backend validation response. Caption: "Server validation response for invalid input".

---

**Suggested short explanations to add under each code block in the report**
- `user.model.js`: "The virtual `password` hashes plain passwords; `comparePassword()` verifies during signin."
- `auth.controller.js`: "`signin` validates credentials and returns a signed JWT with user claims."
- `auth` middleware: "`requireSignin` reads the `Authorization` header and verifies the token with `jwt.verify`."
- Frontend: "The token is stored in `localStorage` and sent as `Authorization: Bearer <token>` on protected requests."

---

If you want I can also:
- generate a ready-to-insert markdown file for your main assignment document containing these sections and placeholders for screenshots (done: this file), or
- export a Postman collection JSON with the signin/signout and one protected-request ready to import into Postman. (tell me if you want the Postman collection.)

---

Paste this file content into your assignment doc under Part II (c) or attach the `docs/Part-II-C_API_Integration.md` file as supporting documentation.
