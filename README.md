[![](screen.png)](https://mudroljub.github.io/igrica-partizani/)

# Igrica partizani

Male igrice o Nemcima i partizanima.

## TODO:

- BUG: nekad ne učita slike
    - da prvo učita sve slike pre nego što scena krene
- otkriti zašto Zgrada neće da koristi prirodnu veličinu slike?
- da na esc napuštati nivo
- refaktor Pozadina da nasleđuje Slika, ne Predmet
- OPTIMIZACIJA
    - proveriti šta se učitava na naslovnoj, šta se instancira
    - uklanjati događaje i sve čistiti na kraju nivoa

### Faza 1: refaktor i sredjivanje
- Avionce: promeniti zvuk motora
- spojiti ranjenike
- preimenovati u ranjenici na sutjesci
- spojiti tenkic dva igraca i tenkic protiv kompa, jedina razlika je mrdaNasumicno
- spojiti 2d-odozgo/Oblak i 2d-bocno/Oblak?
- spojiti savo-dan i savo-noc
- TenkBocnoIgrac: odvojiti klasu Granata
- TenkOdozgo: spojiti sa TenkIgracOdozgo
- camac: popraviti odbijanje
- da svi ispaljuju više projektila (radi na Avionce.js)
- Humel: dodati sliku gori

### Faza 3: 3D
- dodati predmetima z osu (default 0)
- spojiti predmete razlicitih perspektiva u jedan predmet (bocno, odozgo, prvolice..) sa više prikaza
- srediti 3D koliziju
- napraviti jednu mapu sa tri prikaza
