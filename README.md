![](screen.png)

# Partisan Games ★

Small games inspired by Yugoslav partisans.

Homepage: [partisan-games.github.io](https://partisan-games.github.io/)

Repo: [github.com/partisan-games/partisan-games.github.io](https://github.com/partisan-games/partisan-games.github.io)

## TODO

### BUGFIX

- BUG: Top nakon igraj opet (par puta) ne skida lepo energiju
    - i Bombaš i drugi nivoi baguju, zeza GameLoop?
- BUG: ne radi TenkiciScena zavrsniProzor
- BUG: 1944 nema pozadine
- BUG: Savo nije pauziran na restart (možda autostart false?)
- BUG: Savo mrtav nema prozorce

### UI

- iskulirati Report, integrisati ga na kraju

- Savo ne počinje, Rajlovac počinje odmah
- umesto uvodniProzor napraviti nesto poput uvodniHtml?
    - problem: restart briše uvodni prozor, a treba nam svaki put
    - apstrahovati gui: WarplaneScena, Rajlovac i Savo
    - startGame i handleClick su vrv suvišni
    - FIX: Warplane Scena  uvodniProzor()
- integrisati ui i GUI
    - ukinuti GUI
    - Savo exit prozor ne radi
    - BUG: spinner nije na sredini
- integrisati stilove
    - spojiti klase za UI pozicioniranje

### 3D
- srediti 3D igre:
    - urban-guerrilla 
        - promeniti NOB grafite
        - dodati nemce
    - warplane 
        - promeniti da liči na stari
        - preimenovati u Operation Ratweek
    - Savo Mitraljezac (uporediti sa starim, srediti)
        - BUG: kuckanje ne staje kad počne igra
- dodati 3d model u 1944?

### Završno
- na scenu top dinamičku pozadinu, dim, avione kako lete...
- glavni meni da bude karta jugoslavije sa izborom misija
    - sakriti platno ako ne treba
- nazivi nivoa: Bitka za Krupanj, Franjo Kluz...
- prebaciti potisak na predmet?
- možda različita boja dugmića ili ikonice na dugmiće. pogledati rpg game ui 
- dodati razliku između pobede i poraza (druga boja prozora, zvuk, slavlje / tuga...)
- dodati komande i ciljeve svuda

### Test i optimizacija
- proveriti sve nivoe sa sporijim i bržim fps
- probati neki build

### Ideje za kasnije

Avion leti
- probati da tenkovi dolaze i pucaju

Ideje za nivoe:
- odbrani bunker
- odbrani polozaj
- hercegovina 1942, četnici iskaču iza kamenja, pa zajedno sa italijanima
- sremski front (top)
- desant na drvar (padobranci)
- skijaši
- podmornica

Možda preraditi:
- pucacina funkcionalna
- prost-frp
- komanchi

# Scene

## Tenk puca

* tenk ide i puca (možda iskoristiti logiku avion puca sa strane)
* može i dva tenkića

## 1944 (avion puca odozgo)
* iskoristiti avionce.gif

## Avionce puca (sa strane)
* pozadina se pomera (moze horizontalno i vertikalno)
* zgrade i objekti se nasumicno pojavljuju
* granatom razara i pali kuce

ubaciti bonuse, da uhvatis novi zivot, novo oruzje, bombu, pojacanje, brzinu...

## Bekstvo iz Jasenovca

* Tenk patrolira nasumično levo desno ispred žice.
* Nikad ne ide do kraja, uvek se okrene u drugo vreme.
* Ranjeni i isprebijani lik (četnik, partizan, Jevrej, nebitno, zatvorenik) puže.
* Mora da pređe ulicu a da ga ne zgazi tenk.
* Možda scena noć sa reflektorima ili rasvetom?
* izbegava mine, spasava decu/ranjenike

## Odbrani bunker

* napraviti partizansku verziju bunker puca (odbrana Užica, Kadinjača, Bihać...)
* svaki nivo prelaziš tako što izgubiš (bilo ih je previše), ali se gleda koliko si ih ubio

## Partizanski kurir

napraviti partizansku verziju super mario:
trci, uzima hranu, izbegava metkove, preskace bombe...
