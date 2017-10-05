# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


# Instalación
//Using nginx and service
https://gorails.com/deploy/ubuntu/16.04

Read How to Install  or go https://gorails.com/setup/ubuntu/16.04
$ sudo apt-get update
//install postgresql
$ sudo apt-get install postgresql postgresql-contrib
$ sudo apt-get install pgadmin3
//create a user or change postgres password
$ sudo -u postgres psql postgres
$ \password postgres
$ Enter new password: <enter_password>

//Installing Ruby
$ sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs

//install ruby using rvm
$ sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
$ sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
$ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
$ curl -sSL https://get.rvm.io | bash -s stable
$ source ~/.rvm/scripts/rvm
$ bash --login
$ rvm install 2.4.1
$ rvm use 2.4.1 --default
$ ruby -v

//if you get 
"The program 'ruby' is currently not installed. You can install it by typing: sudo apt install ruby"
then you need to go to 
Terminal > Preferences > profiles (new or edit one profile) > Command and mark 'run command as a login shell'

//installing rails
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ gem install rails -v 5.1.3

//postgresql dependencies
$ sudo sh -c "echo 'deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main' > /etc/apt/sources.list.d/pgdg.list"
$ wget --quiet -O - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | sudo apt-key add -
$ sudo apt-get update
$ sudo apt-get install postgresql-common
$ sudo apt-get install postgresql-9.5 libpq-dev

//To run the project on production (only first time)
//configure database.yml
$ RAILS_ENV=production rake secret
and replace <%= ENV["SECRET_KEY_BASE"] %> with the generated code (file config/secret.yml)
production:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>
$ RAILS_ENV=production rake db:create       or      rake db:create 

***** Restaurar la base de datos con el Backup, hacerlo con PGadmin ******

$ RAILS_ENV=production rake db:migrate 
  
$ RAILS_ENV=production rake assets:precompile
$ rails s -e production

//the just run
$ rails s -e production
