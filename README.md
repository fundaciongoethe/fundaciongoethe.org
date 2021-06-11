# fundaciongoethe.org

<p align="center">
	<img src="https://res.cloudinary.com/lenesaile/image/upload/v1599732281/lene-blog_mebtmm.svg" alt="Lene" width="100" align="center" />
</p>

<p align="center"><a href="https://www.lenesaile.com"><strong>lenesaile.com</strong></a></p>

<p align="center"><em>Eleventy · Tailwind CSS · HTML · CSS · Javascript</em></p>

---

> **20.04.2021 inline css**
> package.json: "build:postcss": "npx cross-env NODE_ENV=production postcss src/assets/css/main.css -o src/\_includes/main.min.css",
> layouts/base.njk: {% if meta.isProduction %} {% set css %}{% include "main.min.css" %}{% endset %} <style>{{ css | cssmin | safe }} </style> {% else %} <link rel="stylesheet" href="/assets/main.min.css" /> {% endif %}

## Project Overview

- El proyecto utiliza [Eleventy](https://11ty.io) como un generador de sitios estáticos
- La plantilla por defecto es [Nunjucks](https://mozilla.github.io/nunjucks/)
- PostCSS preparado para manejar:
  - TailwindCSS
  - Autoprefixer
- PurgeCSS para eliminar el CSS no utilizado (configurado para TailwindCSS por defecto) en production
- AlpineJS
- HTML minified en production
- CSS inlined y minified en production
- Webpack para agrupar scripts
- Scripts optimizados para production

---

### Install dependencies

```
npm install
```

### Working locally

```
npm run dev
```

### production build

```
npm run build
```

---

#### Deploy status

[![Netlify Status](https://api.netlify.com/api/v1/badges/e6eb38e1-d081-46ea-a4f6-4d3d36ab7036/deploy-status)](https://app.netlify.com/sites/albertoballesteros/deploys)

---
