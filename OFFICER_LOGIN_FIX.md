# Officer Login Fix

## Correct hierarchy
Master Admin -> Admin -> Field Officer -> Supervisor -> Guard
                     \-> Officer

## Officer rules
- Master Admin and Admin can create an Officer.
- Officer Parent ID must be an existing Admin ID.
- Officer cannot create Admin, Field Officer, Supervisor or Guard.
- Officer login redirects to `officer.html`.
- Login accepts role `officer` and validates Staff ID + password against SQLite.

## Important for Railway
After replacing the project files, redeploy/restart the Railway service. The browser will use the newly deployed `login.js`, `app.js`, `officer.html`, and `server.js`.

## Login test
1. Login as Master Admin (`adi123` / `sndf1234`) if using the default bootstrap account.
2. Create a normal Admin.
3. Create an Officer and select that normal Admin in Parent ID.
4. Logout.
5. Login As = Officer, then use the Officer Staff ID and password.
6. The dashboard opens at `officer.html`.

Do not use the Master Admin ID as an Officer Parent ID.
