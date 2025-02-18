import SceneManager from './SceneManager.js'

const manager = new SceneManager()
manager.start('MainMenu')

window.addEventListener('popstate', () => {
  const confirmation = window.confirm('Pritiskom na back napuštate sajt. Potvrdite komandu.')
  if (!confirmation)
    history.pushState(null, null, location.href)
})
