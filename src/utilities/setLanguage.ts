export const setLanguage = (lang: string) => {
  const languages = ['en', 'ru', 'be'];

  const language = languages.find(item => item === lang);

  if (language) {
    return language;
  } else {
    return 'en';
  }
};
