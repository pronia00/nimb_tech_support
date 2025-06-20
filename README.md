# Nimb Tech Support Web App

Простое веб‑приложение для отправки заявок в техническую поддержку из Telegram Web App.

## Запуск

Откройте `index.html` любым http сервером (например, `npx serve .`) и установите в `script.js` корректный URL вашего API вместо `/api/support`.

## Использование

1. Заполните все поля формы.
2. Прикрепите файлы при необходимости.
3. Нажмите **Отправить обращение** и подтвердите отправку.

## Развёртывание через Docker

1. Установите Docker на сервер (`sudo apt install docker.io`).
2. Склонируйте репозиторий и перейдите в папку проекта.
3. Постройте образ:
   ```bash
   docker build -t nimb-support .
   ```
4. Запустите контейнер:
   ```bash
   docker run -d --name nimb-support -p 8080:80 nimb-support
   ```
   Сайт станет доступен на порту `8080`.

## Подключение домена через Nginx

1. Настройте DNS записи домена, указывая на IP вашего сервера.
2. Установите Nginx на сервер (`sudo apt install nginx`).
3. Создайте конфигурацию сайта `/etc/nginx/sites-available/nimb-support.conf`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:8080;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```
4. Активируйте конфигурацию:
   ```bash
   sudo ln -s /etc/nginx/sites-available/nimb-support.conf /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```
5. Теперь сайт доступен по вашему домену `http://your-domain.com`.

