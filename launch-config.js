// Shared public configuration. Publish changes through the repository, never URL parameters.
// Owner-confirmed routes: Cash App and manual Chime only.
(function(root) {
  const config = Object.freeze({ donationUrl: 'https://cash.app/$wholedonuts', chimeSign: '$wholedonuts', ecosystemUrl: 'https://wenevergonnaclose.com/', repository: 'https://github.com/thewholedonuts-beep/wholedonuts-universe', stores: {tnc: '', awd: ''}, movement: { username: 'nurturermovement', displayName: 'The Nurturer Movement', bio: '10 dimensions of whole-life nourishment — freely accessible to everyone. F.O.O.D. — Freedom of Original Design. Your support keeps this alive.', goalAmount: 2500, goalCurrency: 'USD', goalLabel: 'Launch the movement before surgery' } });
  if (typeof module === 'object') module.exports = config;
  else root.WholeDonutsLaunchConfig = config;
})(typeof window === 'object' ? window : globalThis);
