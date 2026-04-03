import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import PosPage from '../pages/pos/PosPage';
import KitchenPage from '../pages/kitchen/KitchenPage';
import MenuPage from '../pages/menu/MenuPage';
import DashboardPage from '../pages/admin/DashboardPage';
import ProductsPage from '../pages/admin/ProductsPage';
import CategoriesPage from '../pages/admin/CategoriesPage';
import TablesPage from '../pages/admin/TablesPage';
import UsersPage from '../pages/admin/UsersPage';
import OrdersPage from '../pages/admin/OrdersPage';
import ReportsPage from '../pages/admin/ReportsPage';
import SettingsPage from '../pages/admin/SettingsPage';
import ProtectedRoute from './ProtectedRoute';

export default function AppRouter(){ return <Routes>
<Route path='/login' element={<LoginPage/>}/>
<Route path='/menu' element={<MenuPage/>}/>
<Route path='/pos' element={<ProtectedRoute><PosPage/></ProtectedRoute>}/>
<Route path='/kitchen' element={<ProtectedRoute><KitchenPage/></ProtectedRoute>}/>
<Route path='/admin' element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
<Route path='/admin/products' element={<ProductsPage/>}/><Route path='/admin/categories' element={<CategoriesPage/>}/><Route path='/admin/tables' element={<TablesPage/>}/><Route path='/admin/users' element={<UsersPage/>}/><Route path='/admin/orders' element={<OrdersPage/>}/><Route path='/admin/reports' element={<ReportsPage/>}/><Route path='/admin/settings' element={<SettingsPage/>}/>
<Route path='*' element={<Navigate to='/pos' replace/>}/>
</Routes>; }
