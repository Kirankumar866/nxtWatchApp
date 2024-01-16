import React from 'react'

const SaveContext = React.createContext({
  savedVideoList: null,
  addSaveVideo: () => {},
})

export default SaveContext