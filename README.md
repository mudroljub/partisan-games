[![](screen.png)](https://mudroljub.github.io/igrica-partizani/)

# Partisan Games ★

Male igrice o Nemcima i partizanima.

## TODO:

- da na esc napuštati nivo
    - otvarati prozor confirm

### Sređivanje nivoa
- ići po nivoima i prebaciti TODO ovde
- spojiti ranjenike
- preimenovati u ranjenici na sutjesci
- da svi ispaljuju više projektila (radi na Avionce)

### 3D
- dodati predmetima z osu (default 0)
- srediti 3D koliziju
- integrisati https://github.com/mudroljub/partisans
- dodati neke 3D igre, poput Savo i napad na aerodrom

### Test
- proveriti sve nivoe sa sporijim i bržim fps

## Dokumentacija

### Scena

`Scena` automatski poziva razne metode, koje nasledne scene mogu implementirati.

Metode koje poziva jednom:

```js
init()
```

Metode koje poziva na klik:

```js
handleClick = () => {}
```

#### Glavna petlja

Metode koje Scena poziva unutar glavne petlje:

```js
loop(dt, t) {
    this.proveriTipke(dt)
    this.update(dt, t)
    this.cisti()
    this.render(dt, t)
    this.sablon()
}
```

Ako dodamo predmet sceni, Scena na njemu svaki frejm poziva sledeće metode:

```js
predmet.proveriTipke()
predmet.update()
    predmet.proveriGranice()
predmet.render()
```

Ako predmeti imaju druge predmete unutar sebe, i njihove metode će se rekurzivno pozivati.

Ako predmet nije dodat sceni, onda ove metode pozivamo ručno. 

Scenu okončavamo na `end()`, što zaustavlja animaciju, čisti šablone iz DOM-a, prazni predmete, zaustavlja zvuke i slično. U naslednim scenama je potrebno ukloniti sve dodate događaje.

### Platno

Platno vodi računa o veličini ekrana. Podrazumevano je to veličina scene.

### Mish

Mish vodi računa o svemu što se tiče kursora, njegovoj poziciji, izgledu, itd.
