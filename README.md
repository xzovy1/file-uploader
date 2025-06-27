# file-uploader
### Description
this app is a stripped down version of a personal storage service like Google Drive with the main goal of practicing using the Prisma ORM (object relational mapper). It will build off everything learned so far in T.O.P, with added Prisma, @quixo3/prisma-session-store and multer packages.

### Layout
#### Login Page
- basic login page
#### File dashboard
- displays all uploaded files (if any)
    - selecting each folder/file shows info pertinent to that file/folder (i.e. name, size, date_time uploaded)
    - users should be able to download files (or folders)
- File upload form
    - * note when a file is uploaded the URL wil be saved in the DB
### DB
#### Users
- primary key
- username
- password
- fk_folders

#### Folders
- primary key
- name
- date
- fk_users

#### Files
- primary key
- name
- date
-fk_folder
  