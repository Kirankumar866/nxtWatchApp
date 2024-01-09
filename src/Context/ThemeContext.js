import React from 'react'

const ThemeContext = React.createContext({
  lightMode: null,
  toggleThemeMode: () => {},
})

export default ThemeContext