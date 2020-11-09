import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

const ACCEPT_CONTENT_TYPE = {
  json: 'json',
  image: 'image',
};

const MEETUPS_API = {
  MEETUP: (meetupId) => `${API_URL}/meetups/${meetupId}`,
  IMAGE: (imageId) => `${API_URL}/images/${imageId}`,
};

async function fetchMeetup(id) {
  return makeRequest(MEETUPS_API.MEETUP(id));
}

async function fetchImage(id) {
  return makeRequest(MEETUPS_API.IMAGE(id), ACCEPT_CONTENT_TYPE.image);
}

async function makeRequest(url, acceptContentType) {
  const response = await fetch(url);

  if (response.ok) {
    switch (acceptContentType) {
      case ACCEPT_CONTENT_TYPE.image: {
        const blob = await response.blob();

        return URL.createObjectURL(blob);
      }
      default: {
        return response.json();
      }
    }
  }

  return null;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    meetup: null,
    imageUrl: null,
  },

  agendaItemTitles,
  agendaItemIcons,

  mounted() {
    this.getMeetupAndImageUrl();
  },

  methods: {
    async getMeetupAndImageUrl() {
      const meetup = await fetchMeetup(MEETUP_ID);

      if (meetup) {
        this.meetup = {
          ...meetup,
          localDate: new Date(meetup.date).toLocaleString(navigator.language, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
        };

        this.imageUrl = await fetchImage(this.meetup.imageId);
      }
    },
  },
});
