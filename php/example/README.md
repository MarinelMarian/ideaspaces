# ideaspace - PHP project example
This project has been tested with PHP 5.5. It uses the [Slim framework](http://www.slimframework.com/) to create a REST endpoint.

## Install PHP Composer

    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php -r "if (hash_file('SHA384', 'composer-setup.php') === '92102166af5abdb03f49ce52a40591073a7b859a86e8ff13338cf7db58a19f7844fbc0bb79b2773bf30791e935dbd938') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
    php composer-setup.php
    php -r "unlink('composer-setup.php');"

## Install dependencies

    php composer.phar install

## Run the app
    php -S 0.0.0.0:8080 -t public public/index.php

Navigate to [http://localhost:8080/ideas](http://localhost:8080/ideas), you should see the following in your browser:

    {"hello":"ideas"}
