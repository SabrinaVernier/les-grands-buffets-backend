module.exports = {
  routes: [
    {
      method: "POST", // méthode de la route
      path: "/reservations/buy", // chemin de la route (le /api est implicite)
      handler: "reservation.buy", // lien vers le controller lié à la route (pas encore créé)
    },
  ],
};
