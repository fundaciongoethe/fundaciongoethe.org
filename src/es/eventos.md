---
title: Eventos
layout: event-archive
permalink: '/{{ locale }}/eventos/index.html'
translationKey: 'events'
seo:
  title: Eventos
  description: En la Fundación Goethe te ofrecemos una amplia gama de eventos únicos. Conciertos, visitas guiadas, exposiciones o excursiones
  image: social/events-header.jpg
herogrid:
  title: Nuestros próximos eventos
  text: En la Fundación Goethe te ofrecemos una amplia gama de eventos únicos. Conciertos, visitas guiadas, exposiciones o excursiones con almuerzo y cata de vinos.
  images:
    featured1: ./src/assets/images/events/evento-culinarico.jpg
    alt1: Fotografía de un evento gastronómico
    featured2: ./src/assets/images/events/evento-concierto.jpg
    alt2: Fotografía de un concierto del Fukio Trio de saxófonos
    featured3: ./src/assets/images/events/evento-excursion.jpg
    alt3: Fotografía de una antigua calle española
    featured4: ./src/assets/images/events/evento-visita.jpg
    alt4: Fotografía de una visita a la fábrica
cta2: # complete path for eleventy img srcset output, alt required
  title: ¿Quieres estar informado sobre futuros eventos?
  text: Suscríbete a nuestro boletín para recibir invitaciones por correo electrónico. En los correos electrónicos recibirás información sobre los eventos planeados así como un enlace para la inscripción directa. No se llevarán a cabo medidas de publicidad.
  btnText: Recibir invitaciones
  btnLink: /es/invitaciones/
  image: ./src/assets/images/cta/concert2.jpg
  alt: Konzert im Palacio Real
pastevents:
  title: Eventos pasados
  description: En nuestro archivo de eventos encontrarás todos los eventos y fechas que ya han tenido lugar
---

<!-- hero -->

{% include "components/hero-grid.njk" %}

<div class="my-10 2xl:md:my-16 xl:my-28">
  <ul class="divide-y divide-gray-300 md:bg-gray-100 md:border-t md:border-b border-gray-300">
    <!-- if events -->
    {% for event in collections.eventosFuturos %}
    <!-- future events -->
    <li class="px-3 py-5 md:py-0 max-w-5xl mx-auto">
      <div class="flex items-center space-x-4">
        <a class="no-underline py-1 sm:py-5 lg:py-6" tabindex="-1" href="{{ event.url }}">
          <div class="flex flex-col items-center justify-center w-20 md:w-32 lg:w-40 text-center">
            <p class="text-xs uppercase tracking-wider text-gray-500 font-semibold">
              {{ event.date | date("dddd", locale) }}
            </p>

            <p class="text-4xl font-semibold">
              {{ event.date | date(" Do", locale) }}
            </p>

            <p class="text-xs uppercase tracking-wider font-semibold">
              {{ event.date | date("MMM", locale) }}
            </p>
          </div>
        </a>

        <div class="hidden md:flex h-40 w-40 relative bg-gray-200">
          <a href="{{ event.url }}" tabindex="-1">
            <!-- picture shortcode -->
            {% Picture event.data.images.featured,"bg-gray-200", "grayimg absolute inset-0 w-full h-full object-cover",
            event.data.images.alt, "lazy", "20vw" %}
          </a>
        </div>

        <div class="flex flex-col flex-1 min-w-0">
          <a class="no-underline py-1 sm:py-5 lg:py-6" href="{{ event.url }}">
            <div class="flex items-center justify-start">
              <p
                class="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border border-gray-300 uppercase tracking-wider"
              >
                {{ event.data.type }}
              </p>

              <p class="hidden sm:block text-xs text-gray-500 ml-2">
                {{ event.data.access }}
              </p>
            </div>

            <h2
              id="{{ event.data.title | slug }}"
              class="standardtext md:uppercase font-semibold xl:font-bold my-1 md:mb-4 max-w-sm"
            >
              {{ event.data.title }}
            </h2>

            <div class="flex items-center justify-start">
              <p class="mr-4 font-semibold text-red-600 uppercase tracking-wider text-xs">
                {{ event.data.city }}
              </p>
              <p class="text-xs font-semibold hidden sm:block">
                <!-- if opening, otherwise start -->
                {% if opening %}
                {{ meta[locale].event.entry }}:
                {{ event.data.opening | date("HH:mm", locale) }}
                {% else %}
                {{ meta[locale].event.start }}:
                {{ event.data.date | date("HH:mm", locale) }}
                {% endif %}
              </p>
            </div>
          </a>
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <a
            tabindex="-1"
            href="{{ event.url }}"
            class="inline-flex items-center shadow-sm px-2.5 py-2.5 rounded-full bg-red-600 transform hover:translate-x-2 transition duration-300 ease-in-out mr-1 sm:mr-3"
          >
            {% svg "arrow-right-white", "h-5 w-5 lg:h-10 lg:w-10", hidden %}
          </a>
        </div>
      </div>
    </li>
    {% endfor %}

  </ul>

  <!-- past events -->

  <div class="max-w-xl mx-auto">
    <h2 class="standardtitel mt-20 mb-6 2xl:mb-8 text-gray-900 text-center">
      {{ pastevents.title }}
    </h2>

    <div class="standardtext text-center">
      <p>
        {{ pastevents.description }}
      </p>
    </div>

  </div>

  <div class="bg-white max-w-xl mx-auto border-t sm:border border-gray-300 sm:rounded-md" x-data="{selected:null}">
    <ul class="shadow-box">
      <!-- sorted by year past events -->
      {% for year, yearPosts in collections.eventosPasados %}

      <li class="relative">
        <button
          type="button"
          class="w-full px-4 sm:px-8 py-6 text-left"
          @click="selected !== {{ loop.index }} ? selected = {{ loop.index }} : selected = null"
        >
          <div class="flex items-center justify-between">
            <h3 class="md:font-semibold 2xl:font-bold">
              {{ year }}
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="18" y1="13" x2="12" y2="19" />
              <line x1="6" y1="13" x2="12" y2="19" />
            </svg>
          </div>
        </button>

        <div
          class="relative overflow-hidden max-h-0"
          style=""
          x-ref="container{{ loop.index }}"
          x-bind:style="selected == {{ loop.index }} ? 'max-height: ' + $refs.container{{
            loop.index
          }}.scrollHeight + 'px' : ''"
        >
          <div class="p-3 sm:p-6">
            {% for event in yearPosts | reverse %}

            <a
              class="no-underline text-sm bg-gray-200 py-0.5 rouded-sm pr-1 hover:bg-yellow-400"
              href="{{ event.url }}"
            >
              <span class="bg-black text-white px-2 py-0.5 rouded-sm">
                {{ event.data.date | date("Do MMMM yyyy", locale) }}:</span
              >
              {{ event.data.title }}, {{ event.data.city }}</a
            >

            {% endfor %}
          </div>
        </div>
      </li>

      {% endfor %}
    </ul>

  </div>
</div>

<!-- hero -->

{% include "components/cta2.njk" %}

<!-- include event schema  -->

{%- include "schemas/event-schema.njk" %}

<!-- ende -->