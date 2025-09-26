import React from 'react';
import AppRoutes  from './route/Route';
import {AuthProvider} from './context/AuthContext';
import { OMDBProvider } from './context/OMDbContext';
import { UserMovieProvider } from './context/UserMovieContext';
import { CacheProvider } from './context/CacheContext';

function App(){
  return(
    <div>
      <React.StrictMode>
          <AuthProvider>
            <OMDBProvider>
              <UserMovieProvider>
                <CacheProvider>
                  <AppRoutes />
                </CacheProvider>
              </UserMovieProvider>
            </OMDBProvider>
          </AuthProvider>
      </React.StrictMode>
    </div>
  )
}

export default App