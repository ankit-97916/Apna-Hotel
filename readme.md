views folder - creating two folders 
1 is listings-  store templating ejs files for templates , 
2 is layouts - store common boilerplate code for web pages.

Public folder - store two folders for static files
1 css folder - store all styling files.
2 js floder - store all js files 

project phase 1 part a-
1. create routes- 
CRUD operation
2. crete ejs templates-
3. access data from database initialize
4. create a model for database

Projext phase 1 part b.

1. creating boilerPlate for common code all web pages
2. navbar.
3. footer.
stylin all templtes routes.

Projext phase 1 part C.

1.  Validations and errors handling
a. client side validetion and error handling

install JOI package for schema validation server side schema

Phase 2 part a 
1 handling deletion - mongoose middle wares

2. creating Review Model 
3. validation for reviews
a. client side validation in form.
b. server side validations wirh - joi.
4. render reviews show  and style 

5. delete reviews using $pull operator pull is a mongo operator
6. delete listing and listing review with delete mongoose middle ware.

phase2 part b
restructuring the listings and reviiews using exprees. Router().
Expree router way to organaise express application such that our primary app.js file does not bloated.
const router = express.Router() 

2. cookies 
a. how to send cookies in express
res.cookie("name" "value"); 

phase 2 part c
 1. state- (session) status of client side to server side .
2. protocol - rules jo cleient side to server side follow hote hai.
a. statufull protocol. - jisme status save hota hai server side temprory storage. eg. ftp.
b. stateless protocol- jisme koi bhi information save nahi hoti hai eg http.
3. express session - make our session statefull using express session id. it is a Package.
a.  store the data information in temprory storage.
b.  session id cookies ke form me browser (frontened ko de dega ).
c.  connect flash is package show one time messages.
 "multer": "^1.4.5-lts.2",
 "multer-storage-cloudinary": "^4.0.0",
