import { createContext, useEffect, useState } from "react"
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth"
import { auth } from "../firebase"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [calendarToken, setCalendarToken] = useState(
    () => sessionStorage.getItem("gCalToken") || null
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const register = async (email, password, name) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, { displayName: name })
  }

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const logout = () => {
    sessionStorage.removeItem("gCalToken")
    setCalendarToken(null)
    return signOut(auth)
  }

  const requestCalendarAccess = () =>
    new Promise((resolve, reject) => {
      if (!window.google?.accounts?.oauth2) {
        reject(new Error("Google Identity Services não carregado"))
        return
      }
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/calendar.events",
        callback: (response) => {
          if (response.error) {
            reject(new Error(response.error))
          } else {
            sessionStorage.setItem("gCalToken", response.access_token)
            setCalendarToken(response.access_token)
            resolve(response.access_token)
          }
        },
      })
      client.requestAccessToken()
    })

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        calendarToken,
        login,
        register,
        logout,
        loginWithGoogle,
        requestCalendarAccess,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}
