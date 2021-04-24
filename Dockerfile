FROM wordpress:5.7.1-php8.0-fpm-alpine

ADD https://raw.githubusercontent.com/mlocati/docker-php-extension-installer/master/install-php-extensions /usr/local/bin/

# add php imagick 
RUN chmod uga+x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions imagick