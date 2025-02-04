import { jwtVerify, SignJWT } from "jose";

// Clé secrète pour signer le JWT (à stocker en variable d'env dans un projet réel)
const secretKey = new TextEncoder().encode("super-secret-key");

// Type compatible avec `jose` JWTPayload
type JWTPayload = Record<string, any>; // Enregistre tout avec des clés de type `string` et des valeurs de type `any`


// Générer un JWT
export async function generateJWT(payload: JWTPayload): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" }) // Algorithme de signature
      .setIssuedAt() // Date d'émission
      .setExpirationTime("2h") // Expire dans 2 heures
      .sign(secretKey);
}

// Vérifier un JWT
export async function verifyJWT(token: string): Promise<object | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload; // Token valide, retourne les données
  } catch (error) {
    console.error("JWT invalide:", error);
    return null; // Token invalide
  }
}