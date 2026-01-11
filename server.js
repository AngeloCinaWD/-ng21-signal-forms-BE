// importiamo express dal modulo express
import express from 'express';
// importiamo il modulo cors
import cors from 'cors';

// creo l'applicazione
const app = express();

// creo la porta
const port = 3002;

// middleware gestione cors
// va abilitato il cors perchè FE e BE sono eseguiti su 2 host diversi ed il browser blocca la chiamata per sicurezza
app.use(cors());

// creo gli utenti già presenti e che quindi non sarà possibile prendere
// passando un array con valori duplicati e creando da questo un Set questi verranno rimossi (ci sarà un solo mario)
const takenUserNames = new Set([
  'riccardo',
  'mario',
  'admin',
  'mario',
  'luigi',
]);

console.log(takenUserNames);

// costruisco la route per il check dello username
app.get('/api/check-username', (req, res) => {
  // ricavo lo username passato come query param
  const username = String(req.query.username || '').toLowerCase();

  // dato che ho un Set utilizzo il metodo .has() per sapere se contiene quell'elemento
  const available = !takenUserNames.has(username);

  // simulo una latenza
  setTimeout(() => {
    res.json({ available });
  }, 500);
});

// avvio l'app con un messaggio in console di avvio del server
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

// per avviare il BE digito node server.js
