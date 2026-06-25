'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type UserRole = 'super_admin' | 'tenant_admin' | 'user';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  tenantName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, selectedRole?: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Khôi phục session từ localStorage nếu có
    const savedUser = localStorage.getItem('rovi_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('rovi_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, selectedRole?: UserRole): Promise<boolean> => {
    setLoading(true);
    // Giả lập thời gian phản hồi mạng
    await new Promise((resolve) => setTimeout(resolve, 800));

    let role: UserRole = 'user';
    let name = 'Khách hàng thể thao';
    let tenantName = undefined;

    // Phân tích email hoặc role được chọn để giả lập đăng nhập
    const lowerEmail = email.toLowerCase();
    
    if (selectedRole) {
      role = selectedRole;
      if (role === 'super_admin') {
        name = 'Lê Minh Tú (Super Admin)';
      } else if (role === 'tenant_admin') {
        name = 'Nguyễn Văn Khánh (Chủ sân)';
        tenantName = 'ROVI Pickleball Club';
      } else {
        name = 'Trần Anh Tú (Vận động viên)';
      }
    } else {
      if (lowerEmail.endsWith('@admin.com') || lowerEmail === 'admin@rovi.com') {
        role = 'super_admin';
        name = 'Lê Minh Tú (Super Admin)';
      } else if (lowerEmail.endsWith('@b2b.com') || lowerEmail === 'b2b@rovi.com') {
        role = 'tenant_admin';
        name = 'Nguyễn Văn Khánh (Chủ sân)';
        tenantName = 'ROVI Pickleball Club';
      } else {
        role = 'user';
        name = 'Trần Anh Tú (Vận động viên)';
      }
    }

    const mockUser: User = {
      name,
      email,
      role,
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
      tenantName,
    };

    setUser(mockUser);
    localStorage.setItem('rovi_user', JSON.stringify(mockUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rovi_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || !user) {
        router.replace(`/login?from=${encodeURIComponent(pathname || '')}`);
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        if (user.role === 'super_admin') {
          router.replace('/admin');
        } else if (user.role === 'tenant_admin') {
          router.replace('/b2b');
        } else {
          router.replace('/customer');
        }
      }
    }
  }, [loading, isAuthenticated, user, allowedRoles, router, pathname]);

  if (loading || !isAuthenticated || !user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return (
      <div className="min-h-screen bg-rovi-black flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-rovi-blue border-t-transparent rounded-full animate-spin"></div>
        <p className="font-barlow text-rovi-text-muted tracking-wider text-sm">ĐANG TẢI HỆ THỐNG ROVI...</p>
      </div>
    );
  }

  return <>{children}</>;
};
