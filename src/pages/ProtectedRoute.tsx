import { Navigate } from 'react-router-dom';

// interface ProtectedRouteProps {
//   role: string;
//   children: React.ReactNode;
// }

// const ProtectedRoute = ({ role, children }:ProtectedRouteProps) => {
//   const userRole = localStorage.getItem("userRole") as string | null; // Or retrieve role from state/context

//   if (!userRole || userRole !== role) {
//     return <Navigate to="/unauthorized" replace />; // Redirect to unauthorized page
//   }

//   return <Navigate to="/trip" replace />;
// };

// export default ProtectedRoute;
