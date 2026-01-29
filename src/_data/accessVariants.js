// Reusable access/infobox variants by language

module.exports = {
  es: {
    invite_only: {
      access: 'Se requiere una invitación personal',
      infobox: 'Evento privado, sólo con invitación personal.',
    },

    // Free entry with capacity note
    free_capacity: {
      access: 'Entrada libre',
      infobox: 'Entrada libre hasta completar aforo permitido.',
    },

    // Free entry, capacity note and reserved seats for invitees
    free_seats: {
      access: 'Entrada libre',
      infobox:
        'Entrada libre hasta completar aforo permitido. Asiento reservado solo con invitación personal de la Fundación Goethe.',
    },

    // Free entry with Eventbrite registration
    free_eventbrite: {
      access: 'Entrada libre',
      infobox: 'Entrada libre hasta completar aforo permitido. Con inscripción previa a través de Eventbrite.',
    },

    // Direct registration via FG, includes capacity note
    direct_register: {
      access: 'Inscripción directa',
      infobox:
        'Entrada libre hasta completar aforo permitido. La inscripción directa es posible a través del siguiente enlace.',
    },

    // Donation-based entry with longer explanatory text
    donation: {
      access: 'Entrada con donación',
      infobox:
        'Para cubrir gastos, pedimos una donación por la participación en este concierto. Esto es crucial para la logística, la seguridad y la organización de los eventos. El precio de las entradas no cubrirá el coste total de los actos, pero contribuirá a la sostenibilidad a largo plazo de nuestros programas culturales. Te agradecemos tu comprensión y apoyo.',
    },

    // Ticket sale via Eventbrite
    tickets_eventbrite: {
      access: 'Venta de entradas',
      infobox: 'Venta de entradas con inscripción previa a través de Eventbrite.',
    },

    // Ticket sale via external partner website
    tickets_partner: {
      access: 'Venta de entradas',
      infobox: 'Las entradas para este concierto se pueden adquirir en la web del lugar del evento.',
    },

    // Project choir: listen or participate
    choir_project: {
      access: 'Invitación para escuchar o participar',
      infobox: 'Para registrarse directamente para escuchar o cantar, ver más abajo.',
    },

    // Sold out
    sold_out: {
      access: 'Entradas agotadas',
      infobox: 'Las entradas para este evento están agotadas.',
    },
  },

  de: {
    invite_only: {
      access: 'Persönliche Einladung erforderlich',
      infobox: 'Private Veranstaltung, nur mit persönlicher Einladung.',
    },

    free_capacity: {
      access: 'Freier Eintritt',
      infobox: 'Freier Eintritt bis zum Erreichen der vollen Kapazität.',
    },

    free_seats: {
      access: 'Freier Eintritt',
      infobox:
        'Freier Eintritt bis zum Erreichen der vollen Kapazität. Reservierte Plätze nur mit persönlicher Einladung durch die Fundación Goethe.',
    },

    free_eventbrite: {
      access: 'Freier Eintritt',
      infobox: 'Freier Eintritt mit vorheriger Anmeldung über Eventbrite.',
    },

    direct_register: {
      access: 'Direktanmeldung',
      infobox: 'Freier Eintritt bis zur erlaubten Kapazität. Die Anmeldung ist über den folgenden Link möglich.',
    },

    donation: {
      access: 'Eintritt mit Spende',
      infobox:
        'Zur Deckung der Unkosten bitten wir für die Teilnahme an diesem Konzert um eine Spende. Diese Maßnahme ist entscheidend für die Logistik, Sicherheit und Organisation der Veranstaltungen. Die Eintrittspreise werden die gesamten Kosten der Veranstaltungen nicht decken, tragen jedoch dennoch zur langfristigen Nachhaltigkeit unserer kulturellen Angebote bei. Wir danken Ihnen für Ihr Verständnis und Ihre Unterstützung!',
    },

    tickets_eventbrite: {
      access: 'Kartenverkauf',
      infobox: 'Kartenverkauf mit vorheriger Anmeldung über Eventbrite.',
    },

    tickets_partner: {
      access: 'Kartenverkauf',
      infobox: 'Karten für dieses Konzert können auf der Website des Veranstaltungsorts erworben werden.',
    },

    choir_project: {
      access: 'Einladung zum Zuhören oder Mitmachen',
      infobox: 'Direkte Anmeldung zum Zuhören oder Mitsingen siehe weiter unten.',
    },

    sold_out: {
      access: 'Ausverkauft',
      infobox: 'Für dieses Konzert sind keine Karten mehr verfügbar.',
    },
  },
};
