# Fullstackwebapp

WebApp per la gestione di utenti e commenti.

##Info##

DataBase utilizzato: mysql. Nel file Backend/config/db.js inserire i dati necessari alla connessione col DB.
Sequelize crea le tabelle user e comment, ma è necessario che esista un database chiamato "fullstackwebapp".

Backend realizzato in NodeJS con Restify (pacchetto di comunicazione API RESTful) e Sequelize (ORM Framework orientato al database relazionale).

Frontend realizzato in Angular.

Autenticazione tramite JWT realizzata con le librerie jsonwebtoken in NodeJS e @auth0/angular-jwt in Angular.

##Setup##

Una volta clonata la repository, sia nella cartella Backend che nella cartella Frontend eseguire da terminale il comando "npm install" per scaricare tutti i moduli necessari.

Per avviare il Backend, dalla sua cartella digitare il comando "node index.js".

Per avviare il Frontend, dalla sua cartella digitare il comando "ng serve".

Aprire la webapp all'indirizzo http://localhost:4200/login

##Pagine Web##

/login: pagina iniziale di login. 

/register: pagina di registrazione nuovo utente.

/comments: pagina alla quale si accede appena effettuato il login. Presenta una tabella con tutti i commenti di tutti gli utenti. L'utente loggato potrà aggiungere nuovi commenti (bottone +) e potrà modificare/eliminare solo i propri commenti.In alto a sinistra c'è un bottone "My Profile" per andare al proprio profilo (vedi /users/id), un bottone users visibile solo agli utenti "admin" (vedi /users), un bottone di logout. 

/comments/id: pagina di creazione/modifica di un commento.

/users/id: pagina di modifica dei dati utente, accessibile dalla pagina dei commenti (bottone MyProfile)

/users: pagina visibile solo agli utenti "admin" (solo loro vedono il bottone per accedervi). Presenta la lista di tutti gli utenti mostrando email e role, dando la possibilità di modificare il role di qualsiasi utente.

