# file-uploader

### Description

this app is a stripped down version of a personal storage service like Google Drive with the main goal of practicing using the Prisma ORM (object relational mapper). It will build off everything learned so far in T.O.P, with added Prisma, @quixo3/prisma-session-store and multer packages.

### Layout

#### ejs

##### index

- title
- partial?
- form?

#### Login Page

- sign up page

  - render: index
  - title: 'Sign up'
  - partial: signup

- basic login page

  - render: "index"
  - title: "Welecome ${user.username}"
  - user user
  - form : home
  - filesystem: folders
  - actionPath (formpath): users/$id/upload

- get folder
  - render : index
  - title : prismaFolder name
  - user: res.locals.user
  - partial : home
  - fileSystemEntries: prisma folder
  - actionpath: user/user.id/foldername

#### File dashboard

- displays all uploaded files (if any)
  - selecting each folder/file shows info pertinent to that file/folder (i.e. name, size, date_time uploaded)
  - users should be able to download files (or folders)
- File upload form
  - - note when a file is uploaded the URL wil be saved in the DB

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
- fk_folder
