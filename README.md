# RAMY

**RAMY** est une application web minimaliste 🚆 pensée pour consigner rapidement les voitures de trains du réseau francilien que j’ai emprunté. Développée pour une saisie rapide, mobile first et fluide, elle remplace avantageusement les bases de données artisanales dans Notion.

> Chaque trajet est lié à une **ligne** et un **matériel roulant**, avec la possibilité de préciser le **numéro de voiture** et un éventuel **code porte**.

---

## 🎯 Objectif du projet

Offrir un outil personnel, rapide à utiliser depuis le quai ou en marche, pour archiver avec précision les voitures utilisées. L’interface permet aussi de **visualiser les trajets passés** par ligne et matériel.

Le projet est développé comme un **outil personnel** auto-hébergeable sur un serveur Next.js, avec une UI inspirée d’Apple / Linear.

---

## ✨ Fonctionnalités

* 🏠 Menu d’accueil animé avec framer-motion
* 🔐 Authentification via Supabase
* 🚆 Sélection d’une ligne, puis d’un matériel
* ➕ Ajout d’un trajet avec numéro de voiture et code porte (facultatif)
* 📊 Vue en tableau filtrée par ligne et matériel
* 💾 Données stockées dans Supabase
* 📱 Design mobile first, utilisable à une main
* 🌓 Support light/dark mode
* 🎉 Nouvelle UI encore plus pratique et agréable (>= v0.5.0)

---

## 🧱 Structure de l’app

```
app/
├── ajout/                  # Ajout d’une voiture à un trajet
│   └── [id]/               # Ligne sélectionnée
│       ├── page.tsx        # Choix du matériel roulant
│       └── numVoiture/     # Formulaire d’ajout
├── auth/                   # Auth Supabase
│   └── callback/
├── lignes/                 # Liste de toutes les lignes
├── login/                  # Page de connexion
├── logout/                 # Déconnexion
├── menu/                   # Accueil stylisé
├── vision/                 # Vue tableau des trajets
│   └── [id]/               # Ligne sélectionnée
│       └── table/
├── ui/                     # Composants UI réutilisables
│   ├── Button.tsx
│   ├── HomeButton.tsx
│   ├── LoginButton.tsx
│   ├── VisionCard.tsx
│   ├── VisionHeader.tsx
│   └── etc.
├── layout.tsx              # Layout global
├── globals.css             # Styles globaux
└── page.tsx                # Redirection auto
```

---

## 🛠️ Stack technique

* **Framework** : [Next.js 15](https://nextjs.org/)
* **Auth & BDD** : [Supabase](https://supabase.com/)
* **UI Animée** : [framer-motion](https://www.framer.com/motion/)
* **Composants** : Heroicons, TailwindCSS-like style customisé
* **Hébergement** : Vercel

---

## 🚀 Déploiement

Compatible avec **Vercel** sans configuration spécifique (repose sur `app/` avec App Router).
Assurez-vous que les variables d’environnement suivantes sont bien définies :

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## 🧾 Licence

Ce projet est sous **licence AGPL-3.0** :

* ✅ Code librement modifiable et redistribuable
* 📢 Obligation de publier les sources si vous déployez une version modifiée publiquement
* 🚫 Pas d’usage commercial sans accord explicite

---

## 📌 À venir

* [x] Animation de l’accueil
* [x] Composant `HomeButton` flottant
* [x] Login designé avec framer-motion
* [x] Mode clair 🌞
* [x] Nouvelle UI
* [ ] Export CSV
* [ ] Statistiques de fréquence d’utilisation par ligne