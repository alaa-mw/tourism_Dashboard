// UserRoleContext.tsx
import React, { createContext, useState } from 'react';

interface UserRoleContextProps {
  userRole: string;
  setUserRole: (role: string) => void;
}

const UserRoleContext = createContext<UserRoleContextProps>({
  userRole: '',
  setUserRole: () => {},
});

export const UserRoleProvider = UserRoleContext.Provider;
export default UserRoleContext;
