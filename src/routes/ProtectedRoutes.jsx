import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from '../pages/admin/Admin'

export default function ProtectedRouteWrapper({ auth, userAdmin }) {
  if (!auth) {
    return <Navigate to='/' />;
  }

  
  userAdmin();

  return (
    <Routes>
      <Route path='/*' element={<Admin />} />
    </Routes>
  );
}