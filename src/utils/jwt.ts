import { decodeJwt } from "jose";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token"); // Vérifie si le token existe
  return !!token; // Retourne true si un token est présent, sinon false
};

export const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  if (!token) return true; // Si pas de token, il est expiré
  try {
    const { exp } = decodeJwt(token); // Décodage sécurisé avec `jose`
    return !exp || Date.now() >= exp * 1000; // Vérifie l'expiration
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    return true; // En cas d'erreur, on considère le token expiré
  }
};
