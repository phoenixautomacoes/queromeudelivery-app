# queromeudelivery — pacote de deploy

Aplicação **pré-compilada** (Node/Express + frontend Vite) pronta para a Hostinger.
Não precisa de build no servidor.

- `server/` — bundle do backend (esbuild, deps embutidas)
- `public/` — frontend já compilado (SPA + PWA)
- `package.json` — `npm start` sobe tudo na mesma porta

## Deploy na Hostinger (Node Web App via Git)
- Build command: **vazio**
- Start command: `npm start`
- Node: 22+
- Variáveis: `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_PASSWORD`, `GOOGLE_MAPS_API_KEY`, `NODE_ENV=production`

Detalhes completos em `DEPLOY-HOSTINGER.md` no repositório-fonte (QMD-BASE).

## Como atualizar
Regere `server/` e `public/` a partir do QMD-BASE, copie por cima, e:
`git add -A && git commit -m "update" && git push` — a Hostinger reimplanta.
