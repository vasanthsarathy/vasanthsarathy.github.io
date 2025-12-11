module.exports = function() {
  // Simplified publications data (BibTeX parser was causing hangs)
  // TODO: Implement proper BibTeX parsing or convert manually

  const publications = [
    {
      title: 'Tools in the Loop: Quantifying Uncertainty of LLM Question Answering Systems That Use Tools',
      author: 'Panagiotis Lymperopoulos and Vasanth Sarathy',
      year: '2025',
      booktitle: 'Proceedings of AAMAS',
      abbr: 'AAMAS',
      theme: 'socialreasoning'
    },
    {
      title: '"Let\'s Argue Both Sides": Argument Generation Can Force Small Models to Utilize Previously Inaccessible Reasoning Capabilities',
      author: 'Kaveh Eskandari Miandoab and Vasanth Sarathy',
      year: '2024',
      booktitle: 'EMNLP Workshop on Customizable NLP',
      abbr: 'EMNLP',
      arxiv: '2410.12997'
    },
    {
      title: 'Large Language Models Know What To Say But Not When To Speak',
      author: 'Muhammad Umair and Vasanth Sarathy and Jan Ruiter',
      year: '2024',
      booktitle: 'Findings of EMNLP',
      abbr: 'EMNLP',
      arxiv: '2410.16044',
      poster: 'umair2024emnlp_poster.pdf'
    }
  ];

  // Group by year
  const groupedByYear = {};
  publications.forEach(pub => {
    const year = pub.year || 'Unknown';
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    groupedByYear[year].push(pub);
  });

  const years = Object.keys(groupedByYear).sort((a, b) => {
    const yearA = parseInt(a) || 0;
    const yearB = parseInt(b) || 0;
    return yearB - yearA;
  });

  return {
    all: publications,
    byYear: groupedByYear,
    years: years
  };
};
