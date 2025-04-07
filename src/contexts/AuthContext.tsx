
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  settings?: UserSettings;
};

type UserSettings = {
  notifications: {
    email: boolean;
    appointment: boolean;
    reminders: boolean;
  };
  appearance: {
    darkMode: boolean;
    compactView: boolean;
  };
  privacy: {
    twoFactorAuth: boolean;
    dataSharing: boolean;
  };
  language: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerUser: (name: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  updateProfile: (data: Partial<User>) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users database - we'll add to this when registering new users
const USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin" as const,
    settings: {
      notifications: {
        email: true,
        appointment: true,
        reminders: true,
      },
      appearance: {
        darkMode: false,
        compactView: false,
      },
      privacy: {
        twoFactorAuth: false,
        dataSharing: true,
      },
      language: "English",
    }
  },
  {
    id: "2",
    name: "Test User",
    email: "user@example.com",
    password: "user123",
    role: "user" as const,
    settings: {
      notifications: {
        email: true,
        appointment: true,
        reminders: false,
      },
      appearance: {
        darkMode: true,
        compactView: true,
      },
      privacy: {
        twoFactorAuth: false,
        dataSharing: false,
      },
      language: "English",
    }
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState(() => {
    // Initialize users from localStorage or use the default USERS
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : USERS;
  });
  
  const navigate = useNavigate();
  
  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Save users to localStorage
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);
  
  // Register a new user
  const registerUser = async (name: string, email: string, password: string) => {
    // Check if email already exists
    if (users.some((u: any) => u.email === email)) {
      throw new Error("Email already in use");
    }
    
    // Create a new user
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password,
      role: "user" as const,
      settings: {
        notifications: {
          email: true,
          appointment: true,
          reminders: false,
        },
        appearance: {
          darkMode: false,
          compactView: false,
        },
        privacy: {
          twoFactorAuth: false,
          dataSharing: true,
        },
        language: "English",
      }
    };
    
    // Add user to users array
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    return Promise.resolve();
  };
  
  const login = async (email: string, password: string) => {
    // In a real app, you would validate against a server
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      // Create a user object without the password
      const { password, ...userWithoutPassword } = foundUser;
      
      // Store in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      // Redirect based on role
      if (userWithoutPassword.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      throw new Error("Invalid email or password");
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  // Function to update user profile
  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Also update in users array
      const updatedUsers = users.map((u: any) => {
        if (u.id === user.id) {
          return { ...u, ...data, password: u.password };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };
  
  // Function to update user settings - Updated to handle partial settings updates
  const updateSettings = (settings: Partial<UserSettings>) => {
    if (user && user.settings) {
      const updatedSettings = {
        notifications: {
          ...user.settings.notifications,
          ...(settings.notifications || {})
        },
        appearance: {
          ...user.settings.appearance,
          ...(settings.appearance || {})
        },
        privacy: {
          ...user.settings.privacy,
          ...(settings.privacy || {})
        },
        language: settings.language || user.settings.language
      };
      
      const updatedUser = { 
        ...user, 
        settings: updatedSettings
      };
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Also update in users array
      const updatedUsers = users.map((u: any) => {
        if (u.id === user.id) {
          return { ...u, settings: updatedSettings, password: u.password };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout,
        registerUser,
        updateProfile,
        updateSettings,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin"
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
