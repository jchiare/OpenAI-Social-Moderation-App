export const mockModerationResults = [
  {
    categories: {
      hate: false,
      'hate/threatening': false,
      'self-harm': false,
      sexual: false,
      'sexual/minors': false,
      violence: false,
      'violence/graphic': false,
    },
    category_scores: {
      hate: 6.118194869486615e-5,
      'hate/threatening': 2.230410245829262e-6,
      'self-harm': 2.828315246006241e-6,
      sexual: 5.966658136458136e-5,
      'sexual/minors': 4.747372258862015e-6,
      violence: 6.252455204958096e-5,
      'violence/graphic': 6.377369118126808e-6,
    },
    flagged: false,
  },
  {
    categories: {
      hate: true,
      'hate/threatening': true,
      'self-harm': false,
      sexual: false,
      'sexual/minors': false,
      violence: true,
      'violence/graphic': false,
    },
    category_scores: {
      hate: 0.5396165251731873,
      'hate/threatening': 0.6027854681015015,
      'self-harm': 0.00012398429680615664,
      sexual: 0.0005320304189808667,
      'sexual/minors': 0.00011611494119279087,
      violence: 0.9795045256614685,
      'violence/graphic': 0.0014976278180256486,
    },
    flagged: false,
  },
];

export const mockTextList = ['I like turtles', 'I want to kill them'];
