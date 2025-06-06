import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'
// import AddFood from '../components/AddFood'
import Cart from '../components/Cart'
import ProductPage from '@/components/ProductPage'
import PrivetRoutes from '@/components/PrivetRoutes'
import FoodPage from '@/components/FoodPage'
import CategoriesPage from '@/components/CategoriesPage'
import CategoriesPageData from '@/components/CategoriesPageData'

const AllRoute = () => {
  return (
    <div>
        <Routes>
            <Route path="/"  element={ <PrivetRoutes><Home/></PrivetRoutes>} />
            {/* <Route path="/addfood" element={<PrivetRoutes><AddFood /></PrivetRoutes>} /> */}
            <Route path="/foods" element={<PrivetRoutes><FoodPage /></PrivetRoutes>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<PrivetRoutes><Cart /></PrivetRoutes>} />
            <Route path="/food/:id" element={<PrivetRoutes><ProductPage /></PrivetRoutes>} />
            <Route path="/categories" element={<PrivetRoutes><CategoriesPage/></PrivetRoutes>} />
            <Route path="/categories/:id" element={<PrivetRoutes><CategoriesPageData/></PrivetRoutes>} />
        </Routes>
    </div>
  )
}

export default AllRoute