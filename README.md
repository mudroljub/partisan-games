[![](screen.png)](https://mudroljub.github.io/igrica-partizani/)

# Igrica partizani

Male igrice o Nemcima i partizanima.

## TODO:

- BUG: Hummel se prevrce naopacke u povratku
- Predmet: 
    - promeniti redosled argumenata ili dodati param
    - svuda dodati skalar izbaciti velicinu

- da na esc napuštati nivo
- OPTIMIZACIJA
    - proveriti šta se učitava na naslovnoj, šta se instancira
    - uklanjati događaje i sve čistiti na kraju nivoa
- TEST:
    - proveriti sve nivoe sa sporijim i bržim fps

### Faza 1: refaktor i sredjivanje
- Avionce: dodati zvuk motora
- spojiti ranjenike
- preimenovati u ranjenici na sutjesci
- spojiti tenkic dva igraca i tenkic protiv kompa, jedina razlika je mrdaNasumicno
- spojiti 2d-odozgo/Oblak i 2d-bocno/Oblak?
- spojiti savo-dan i savo-noc
- TenkBocnoIgrac: odvojiti klasu Granata
- TenkOdozgo: spojiti sa TenkIgracOdozgo
- camac: popraviti odbijanje
- da svi ispaljuju više projektila (radi na Avionce.js)

### Faza 3: 3D
- dodati predmetima z osu (default 0)
- spojiti predmete razlicitih perspektiva u jedan predmet (bocno, odozgo, prvolice..) sa više prikaza
- srediti 3D koliziju
- napraviti jednu mapu sa tri prikaza

## Dokumentacija

`Scena` automatski poziva sledeće metode, koje nasledne scene mogu implementirati:

- init()   // samo jednom
- cisti()  // svaki frejm
- sablon() // svaki frejm
- update() // svaki frejm

Ako scena ima niz `predmeti`, svaki frejm se pozivaju njihove metode:

- predmet.update()
- predmet.render()

Ako predmeti scene imaju predmete unutar sebe, i njihove metode će se rekurzivno pozivati.

Ako nasledna scena pregazi roditeljski `update` metod, onda ova logika ne važi.
