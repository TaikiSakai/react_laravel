FROM php:8.2-fpm

EXPOSE 5173

ENV TZ Asia/Tokyo

RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libicu-dev libonig-dev libpq-dev \
    libfreetype6-dev libjpeg62-turbo-dev libpng-dev libjpeg-dev libnss3 vim

RUN docker-php-ext-install pdo_mysql zip intl gd bcmath
RUN docker-php-ext-configure gd --enable-gd --with-jpeg

COPY ./docker/api/php.ini /usr/local/etc/php/php.ini
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app