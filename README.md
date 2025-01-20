[![](screen.png)](https:-mudroljub.github.io/igrica-partizani/)

# Partisan Games ★

Male igrice o Nemcima i partizanima.

## TODO

- bolje osmisliti procenat vraćanja za proveriGranice, nezavisno od fps
```js
if (vreme.proteklo > 1000) {
    sansa = Math.random()
    vreme.reset()
}
```
    - mora se dodati vreme u Predmet

- pseudo random na osnovu t:
```js
function seededRandom(timestamp) {
  const x = Math.sin(timestamp) * 10000
  return x - Math.floor(x)
}
```
    - mora se prosleđivati t

TenkicIde
- bunkeri, vojnici, vozila...
- BUG: ponekad zbunovi svi u istoj ravni (isti x); ne znam kad

RanjenikScena
- prikazati prozore umesto log
- preimenovati u ranjenici na sutjesci
- povecavati broj patrola
- spojiti Bekstvo iz Jasenovca i RanjenikPaljba?
- u jasenovcu beton i trebalo bi ustase, a na sutjesci nemci, italijani, cetnici

TenkOdozgoScena
- scena kao velika mapa lavirint
- kretanje po vise ekrana, kamera prati igraca
- razlicite podloge ubrzavaju/usporavaju tenk
- pobeda/poraz - prepreke ili vreme

### 3D
- dodati predmetima z osu (default 0)
- integrisati https:-github.com/mudroljub/partisans
- dodati neke 3D igre, poput Savo i napad na aerodrom
- srediti 3D koliziju
- dodati 3d model u 1944

### Završno
- glavni meni da bude karta jugoslavije sa izborom misija
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
