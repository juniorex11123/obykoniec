# Instrukcja wdrożenia na home.pl

## Przygotowanie aplikacji

### 1. Konfiguracja Frontend
W pliku `/frontend/.env` ustaw poprawny URL backend:
```
REACT_APP_BACKEND_URL=https://twoja-domena.home.pl/api
```

### 2. Konfiguracja Backend
W pliku `/backend/.env` ustaw:
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=timetracker_db
```

### 3. Aktualizacja CORS w backend/server.py
Zaktualizuj listę dozwolonych origin w `allow_origins`:
```python
allow_origins=[
    "https://twoja-domena.home.pl",
    "https://www.twoja-domena.home.pl",
    "http://localhost:3000",  # dla developerów
],
```

## Wdrożenie na home.pl

### Frontend (React)
1. Zbuduj aplikację:
   ```bash
   cd frontend
   yarn build
   ```

2. Przenieś zawartość folderu `build/` do katalogu głównego domeny na home.pl

### Backend (FastAPI)
1. Zainstaluj Python 3.8+ na serwerze
2. Zainstaluj zależności:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. Uruchom backend:
   ```bash
   cd backend
   uvicorn server:app --host 0.0.0.0 --port 8001
   ```

### Konfiguracja serwera web (Apache/Nginx)

#### Apache (.htaccess)
```apache
RewriteEngine On

# API requests
RewriteRule ^api/(.*)$ http://localhost:8001/api/$1 [P,L]

# React app
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

#### Nginx
```nginx
server {
    listen 80;
    server_name twoja-domena.home.pl;

    location /api/ {
        proxy_pass http://localhost:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        root /path/to/frontend/build;
        try_files $uri $uri/ /index.html;
    }
}
```

## Testowanie

1. Sprawdź czy API działa:
   ```bash
   curl https://twoja-domena.home.pl/api/health
   ```

2. Sprawdź czy frontend ładuje się poprawnie
3. Przetestuj formularz kontaktowy

## Rozwiązywanie problemów z CORS

Jeśli nadal występują problemy z CORS:

1. Sprawdź czy Origin header jest poprawnie ustawiony
2. Upewnij się, że backend zwraca poprawne nagłówki CORS
3. Sprawdź konfigurację proxy serwera web
4. W razie problemów, tymczasowo ustaw `allow_origins=["*"]` w backend/server.py

## Baza danych

Aplikacja wymaga MongoDB. Na home.pl:
1. Zainstaluj MongoDB lub użyj MongoDB Atlas (zalecane)
2. Zaktualizuj MONGO_URL w .env