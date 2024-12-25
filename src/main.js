import SceneManager from './SceneManager.js'

const manager = new SceneManager()
manager.start('MainMenu')

// history.pushState(null, null, location.href)
window.addEventListener('popstate', () => {
  const confirmation = window.confirm('Pritiskom na back napuštate sajt. Potvrdite komandu.')
  if (!confirmation)
    history.pushState(null, null, location.href)
})
