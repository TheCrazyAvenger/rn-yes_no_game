export const getStoryByLanguage = (data: any, lang: string) => {
  if (lang === 'en') {
    return {title: data.title, story: data.story, answer: data.answer};
  }
  if (lang === 'ru') {
    return {title: data.titleRu, story: data.storyRu, answer: data.answerRu};
  }
  if (lang === 'be') {
    return {title: data.titleBy, story: data.storyBy, answer: data.answerBy};
  }

  return {title: data.title, story: data.story, answer: data.answer};
};
