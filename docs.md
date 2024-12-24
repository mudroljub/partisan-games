# Arhitektura

## Core (klase)

### Scena

Ako dodamo predmet sceni, Scena na njemu poziva sledeće metode:
* proveriGranice()
* update()
* render()
Ako predmet nije dodat sceni, onda ove metode pozivamo ručno.

Petlju scene zaustavljamo na stop(), što zaleđuje animaciju. Čitavu scenu okončavamo na end(). Ova metoda uklanja ubačene stvari iz DOM-a, zaustavlja zvuke i slično. Neki predmeti mogu imati end metodu radi lakšeg čišćenja scene.

## Input/Output (singletoni)

### platno

Platno vodi računa o veličini ekrana. Podrazumevano je to veličina scene.

### mish

Mish vodi računa o svemu što se tiče kursora, njegovoj poziciji, izgledu, itd.
