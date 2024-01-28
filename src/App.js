import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';

import NavBar from './Components/NavBar/NavBar';
import Login from './Pages/Authentication/Login/Login';
import ForgotPassword from './Pages/Authentication/Forgot-password/ForgotPassword';
import Home from './Pages/Home/Home';
import Register from './Pages/Authentication/Register/Register';
import ResetPassword from './Pages/Authentication/Reset-password/ResetPassword';
import Contact from './Pages/Contact/Contact';
import Details from './Pages/Details/Details';
import AddProperty from './Pages/Add-property/AddProperty';
import Search from './Pages/Search/Search';
import Dashboard from './Pages/Dashboard/Dashboard';
import Profile from './Pages/Dashboard/Profile/Profile';
import Aside from './Pages/Dashboard/Aside/Aside';
import Categories from './Pages/Dashboard/Categories/Categories';
import Property from './Pages/Dashboard/Property/Property';
import User from './Pages/Dashboard/User/User';
import MyProperties from './Pages/Dashboard/MyProperties/MyProperties';
import { useEffect, useState } from 'react';
import AuthContext from './context/auth-context';
import LoggedIn from './Components/LoggedIn/LoggedIn';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import EditMyProperty from './Pages/Dashboard/MyProperties/EditMyProperty';

function App() {
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState();
  //const {user, setUser} = useContext(AuthContext)

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);
  useEffect(() => {
    if (user) {
        setUserRole(user.role);
    }
}, [user])
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/accueil' element={<Home />} />
          <Route path='/connexion' element={<LoggedIn user={user}><Login /></LoggedIn>} />
          <Route path='/inscription' element={<Register />} />
          <Route path='/mot-de-passe-oublier' element={<ForgotPassword />} />
          <Route path='/réinitialiser-le-mot-de-passe/:token' element={<ResetPassword />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/publier-annonce' element={<ProtectedRoute user={user}><AddProperty /></ProtectedRoute>} />
          <Route path='/annonces' element={<Search />} />
          <Route path='/dashboard' element={<ProtectedRoute user={user}><Aside /></ProtectedRoute>}>
            {userRole === 'admin' ?
              <>
                <Route path='' element={<Dashboard />} />
                <Route path='profile' element={<Profile />} />
                <Route path='utilisateurs' element={<User />} />
                <Route path='categories' element={<Categories />} />
                <Route path='annonces' element={<Property />} />
                <Route path='modifier-mon-annonce/:id' element={<EditMyProperty />} />
                <Route path='mes-annonces' element={<MyProperties />} />

              </>
              :
              <>
                <Route path='' element={<Profile />} />
                <Route path='mes-annonces' element={<MyProperties />} />
                <Route path='modifier-mon-annonce/:id' element={<EditMyProperty />} />

              </>
            }
          </Route>
          <Route path='*' element={<div className='page404 d-flex  justify-content-center align-items-center'><h2 className='text-danger fw-semibold'>404 Page Not Found</h2></div>} />

        </Routes>
      </main>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
