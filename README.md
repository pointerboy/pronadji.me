# pronadji.me

# Pregled

Pronadji.me je React Native aplikacija za Android koja pomaže ljudima da pronađu izgubljene stvari.

# Preduslovi
Ako pokrećete aplikaciju na emulatoru ili pravom uređaju, morate imati Expo instaliran. Expo će sam sebe da instalira na emulatoru i da izjednači verzije tako da broj SDK-a u projektu je jednak instaliranom Expo aplikacijom na virtualnom emulatoru. 

# Konfiguracija 🔧
Pronadji.me radi uz pomoć različitih API i SDK-ova. Pre pokretanja, morate da rekonfigurišete projekat.
## Firebase
- Napravite novi nalog na Firebase konzoli.
- Odaberite da tip projekta bude JS / Web.
- Zamenite sve neophodne parametre sa konzole u `App.js` fajlu.
- Nazad u Firebase konzoli, dozvolite autentifikaciju (tip: mejl)
- Omogućite funkcije: `Realtime Database` kao i `Storage`.
- U permisijama za Storage dozvolite upis novih fajlova (ili ako testirate: omogućite test/development mode opciju)
- U Storage, napravite dva nova foldera pod nazivom: `user_image` i `posts`
- Dodajte podrazumevanu fotografiju u user_image pod nazivom: `user_default.png`
- Dodajte podrazumevanu fotografiju u posts pod nazivom: `bez_objave.png`

<img src="https://i.imgur.com/xlNuG0n.png" alt="firebase1" border="0">

## Maps SDK 🗺️
Kako bi se prikazala mapa, potrebno je da omogućite Maps SDK. https://docs.expo.dev/versions/latest/sdk/map-view/

## Sentry IO
Nije neophodno za rad aplikacije, možete slobodno preskočiti ovaj korak ako ne želite da pratite crash-handling.

- Napravite nalog na Sentry IO.
- Dodajte novi projekat i prekopirajte API ključ u `App.js`

## Maps API / Geocoding
- Napravite nalog na MapQuest-u (prikaz mape u vidu request-a) i PositionStack-u (reverse geocoding) i iskopirajte API ključ.
- https://developer.mapquest.com/documentation/
- https://apilayer.com/
- Dodajte ključeve u `\screens\app\main\CreatePostScreen.js`

# Pokretanje
- Po preuzimanju repositorija, pokrenite `yarn install` kako bi instalirali sve neohpodne pakete. Vrlo je bitno da verzija paketa bude ista kao i u konfiguracionom fajlu.
- Pokrenite Expo (`expo start`).

# Pravljenje samostalne APK (Building Standalone APK)
https://docs.expo.dev/classic/building-standalone-apps/


# Česti problemi i greške
## Zagljavljen na početnom ekranu
- Moguće je da ste ranije imali nalog ali više nije dostupan na Firebase-u. Druga mogućnost jeste čekanje da se Maps API odazove. Jedna od solucija jeste da obrišite keš memoriju aplikacije.
## Expo timed out
- Restartuje Expo na Android-u i pokušajte ponovo pokrenuti aplikaciju.
## Problem sa paketima (postoji ali ga Expo ne prepoznaje)
- Najbolje je u takvim slučajevima da restartujete server i pokušate ponovo. Možete probati i da obrišete keš: `expo r -c`
## Expo ne želi da refreshuje aplikaciju / zaglavi se na Bundling Javascript ...
- Spamujte R dok proces bundlovanja ne počne ponovo.

