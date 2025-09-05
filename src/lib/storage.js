function parseValue2String(value) {
  let parsedValue = null
  switch (typeof value) {
    case 'number':
    case 'string':
    case 'boolean':
      parsedValue = value
      break
    case 'object':
      parsedValue = JSON.stringify(value)
      break
    default:
      break
  }
  return parsedValue
}

function parseStorage2Value(value) {
  try {
    const toJson = JSON.parse(value)
    return toJson
  } catch (error) {
    return value
  }
}

const Storage = () => {
  if (typeof window !== 'undefined')
    return {
      localStorage: {
        setItem: (key, value) => {
          if (!key) return
          const parsedValue = parseValue2String(value)
          window.localStorage.setItem(key, parsedValue)
        },
        getItem: key => {
          if (!key) return
          const value = window.localStorage.getItem(key)
          const parsedValue = parseStorage2Value(value)
          return parsedValue
        },
        removeItem: key => {
          if (!key) return
          window.localStorage.removeItem(key)
        },
        clear: () => {
          window.localStorage.clear()
        },
      },
      sessionStorage: {
        setItem: (key, value) => {
          if (!key) return
          const parsedValue = parseValue2String(value)
          window.sessionStorage.setItem(key, parsedValue)
        },
        getItem: key => {
          if (!key) return
          const value = window.sessionStorage.getItem(key)
          const parsedValue = parseStorage2Value(value)
          return parsedValue
        },
        removeItem: key => {
          if (!key) return
          window.sessionStorage.removeItem(key)
        },
        clear: () => {
          window.sessionStorage.clear()
        },
      },
    }
  return {}
}

export default Storage()
