// import nodemailer from "nodemailer";

// export default async function handler(req, res) {

//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {

//     const { name, email, subject, message } = req.body;

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER,
//       subject: subject,
//       text: `
// Nom: ${name}
// Email: ${email}

// Message:
// ${message}
// `
//     });

//     return res.status(200).json({ message: "Email envoyé avec succès" });

//   } catch (error) {

//     console.error(error);
//     return res.status(500).json({ error: "Erreur serveur" });

//   }
// }

// ce que je viens d'ajouter
import nodemailer from "nodemailer";

export default async function handler(req, res) {

  // ✅ CORS headers sur TOUTES les réponses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Répondre immédiatement au preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: subject || "Nouveau message",
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ message: "Email envoyé avec succès" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}