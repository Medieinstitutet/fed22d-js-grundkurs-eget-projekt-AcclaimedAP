## Spelflöde:

- Spelare och monster automatiskts engageras i combat.
- När monstret dör, får spelaren guld som den kan spendera på uppgraderingar.
- Monsret kommer tillbaka lite starkare.
- Repeat.

### G:

Basspelflödet ska vara implementerat, inkluderat auto-combat, "oändligt", uppgraderingar.

Spelflödet ska fungera felfrit oavsätt hur länge man spelar, dvs spelet ska inte bugga ut med tid eller från vanliga interaktioner.

Spara progress i localstorage

### VG:

Visuell feedback i form av animationer, UI som inte får dig att spy, osv.

## Logiskt flöde:

- spelet uppdateras ungefär 66-67 gånger i sekunden(refererad till tick).
- Varje tick ökar en timer som bestämmer när de ska attackera.
- när timern når den gräns som är sagd så läggs de i "IS_ATTACKING" mode, vilket gör att de rör sig mot sin motståndare tills den är tillräckligt nära, och sedan går in i "IS_CHARGING", vilket gör att den börjar sin attack, när denna del är klar, gör skada, så återgår de till sin basposition.
- När de gör skada, kollar den först ifall skadan kommer att bli blockerad, isf. gör bara 20% skada, annars kollar den ifall man får en Critical hit, och sedan kalkulerar skadan. Sedan kollar den ifall den som tog skada är död.
- Ifall den är död, Ändra bild till gravsten, och sedan börja en timer lik attack timern, som bestämmer hur länge den är död.
- Efter timern så får de fullt hp, byter tillbaka till sin vanliga bild, och påbörjar attack igen.
